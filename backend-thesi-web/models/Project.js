const database = require("../database/connection");
const { io, mapaDeSockets } = require('../config/server');
const crypto = require('crypto');
const { UploadService } = require("../services/uploadService");
const uploader = new UploadService();
const { enviarEmailConvite } = require("../utils/email");
require("dotenv").config();

class Project {

  async create(project, userId) {
  try {
    console.log("[MODEL] Iniciando criação de projeto para userId:", userId);

    const result = await database.transaction(async (trx) => {
      console.log("[MODEL] Inserindo projeto:", project.name);

      // garante que authors é sempre array
      const participants = Array.isArray(project.authors) ? project.authors : [];

      const [inserted] = await trx("t_projeto")
        .insert({
          nm_projeto: project.name,
          nm_autores: participants.length > 0 ? participants.join(",") : null,
          ds_projeto: project.objective,
          ds_plataforma: project.platform,
          id_criador: userId
        })
        .returning("id_projeto");

      const projectId = inserted.id_projeto;
      console.log("[MODEL] Projeto inserido com ID:", projectId);

      // vincula criador ao projeto
      await trx("t_projeto_usuario").insert({
        id_projeto: projectId,
        id_usuario: userId
      });
      console.log("[MODEL] Criador vinculado ao projeto");

      // salva imagens (se houver)
      for (const image of project.templates) {
        console.log("[MODEL] Salvando imagem:", image.originalname);
        await trx("t_imagens").insert({
          id_projeto: projectId,
          id_usuario: userId,
          nm_imagem: image.originalname,
          ds_caminho: image.url
        });
      }

      // trata convites (só se tiver participantes além do criador)
      const uniqueParticipants = [...new Set(participants)].filter(
        (p) => String(p) !== String(userId)
      );

      if (uniqueParticipants.length > 0) {
        for (const participantId of uniqueParticipants) {
          console.log("[MODEL] Criando convite para participante:", participantId);

          const token = crypto.randomBytes(16).toString("hex");

          await trx("t_projeto_convite").insert({
            id_projeto: projectId,
            id_usuario: participantId,
            token,
            ds_status: "pendente"
          });
          console.log("[MODEL] Convite inserido para:", participantId);

          // socket
          const socketId = mapaDeSockets?.[participantId];
          if (socketId) {
            io.to(socketId).emit("novoConviteProjeto", {
              projetoId,
              mensagem: `Você foi convidado para o projeto ${project.name}`
            });
          }

          // email
          const userEmail = await trx("t_usuario")
            .where({ id_usuario: participantId })
            .first()
            .then((u) => u?.ds_email);

          if (userEmail) {
            try {
              await enviarEmailConvite(userEmail, project.name, projectId, token);
              console.log("[MODEL] Email enviado para:", userEmail);
            } catch (err) {
              console.error("[MODEL] Erro ao enviar email para:", userEmail, err);
            }
          } else {
            console.warn("[MODEL] Nenhum email encontrado para participante:", participantId);
          }
        }
      } else {
        console.log("[MODEL] Nenhum participante convidado — projeto só com criador.");
      }

      return { projectId };
    });

    return result;
  } catch (err) {
    console.error("[MODEL] Não foi possível criar o projeto:", err);
    throw err;
  }
  }

  async answer(token, resposta) {
    return await database.transaction(async (trx) => {
      const convite = await trx("t_projeto_convite").where({ token }).first();

      if (!convite) {
        throw new Error("Convite não encontrado");
      }

      if (convite.ds_status !== "pendente") {
        throw new Error("Convite já respondido");
      }

      // atualiza status
      await trx("t_projeto_convite")
        .where({ id_convite: convite.id_convite })
        .update({ ds_status: resposta });

      // se aceitou, adiciona participante no projeto
      if (resposta === "aceito") {
        await trx("t_projeto_usuario").insert({
          id_projeto: convite.id_projeto,
          id_usuario: convite.id_usuario
        });
      }

      return { conviteId: convite.id_projeto_convite, status: resposta };
    });
  }
  
  async findByUserId(userId){
    return await database("t_projeto as P")
      .join("t_projeto_usuario as U", "P.id_projeto", "U.id_projeto")
      .select(
        "P.id_projeto",
        "P.nm_projeto",
        "P.nm_autores",
        database.raw(`TO_CHAR(dt_criacao, 'DD/MM/YYYY') as dt_criacao`),
        database.raw(`TO_CHAR(dt_entrega, 'DD/MM/YYYY') as dt_entrega`),
        "U.ds_status"
      )
      .where("U.id_usuario", userId);
  }

  async findByProfessorId(ProfessorId){
    return await database("t_projeto as P")
      .join("t_projeto_usuario as PU", "P.id_projeto", "PU.id_projeto")
      .join("t_usuario as U", "PU.id_usuario", "U.id_usuario")
      .select(
        "P.id_projeto",
        "P.nm_projeto",
        "P.nm_autores",
        "P.id_criador",
        database.raw(`TO_CHAR("P".dt_criacao, 'DD/MM/YYYY') as dt_criacao`),
        database.raw(`TO_CHAR("P".dt_entrega, 'DD/MM/YYYY') as dt_entrega`),
        "PU.ds_status",
        "U.nm_usuario"
      )
      .where("P.id_professor", ProfessorId);
  }
  
  async findById(projetoId, userId) {
    try {
      const projeto = await database("t_projeto as P")
        .join("t_usuario as U", "P.id_criador", "U.id_usuario"  )
        .join("t_projeto_usuario as PU", "P.id_projeto", "PU.id_projeto")
        .select(
          "P.id_projeto",
          "P.id_criador",
          "P.nm_projeto",
          "P.ds_projeto",
          "P.ds_plataforma",
          "U.id_usuario",
          "U.nm_usuario AS criador",
          database.raw(`TO_CHAR("P"."dt_criacao", 'DD "de" TMMonth "de" YYYY') AS dt_criacao`),
          database.raw(`TO_CHAR("P"."dt_entrega", 'DD/MM/YYYY') AS dt_entrega`),
          "PU.ds_status"
        )        
        .where("PU.id_usuario", userId)
        .andWhere("P.id_projeto", projetoId)
        .first();

        if (!projeto) return null;

        // Buscar imagens relacionadas ao projeto
        const imagens = await database("t_imagens")
        .where("id_projeto", projetoId)
        .select("id_imagem", "ds_caminho");

        // Adiciona ao objeto
        projeto.imagens = imagens.map(img => ({
          id_imagem: img.id_imagem,
          ds_caminho: img.ds_caminho
        }));
  
      return projeto;
  
    } catch (err) {
      console.error("Erro ao buscar projeto pelo ID:", err);
      throw err;
    }
  }
  
  async deleteProject(projetoId, userId) {
    const trx = await database.transaction();
  
    try {
      await trx("t_heuristica").where("id_projeto", projetoId).del();
      await trx("t_semiotica").where("id_projeto", projetoId).del();
      await trx("t_imagens").where({ id_projeto: projetoId, id_usuario: userId }).del();
      await trx("t_arquivos").where({ id_projeto: projetoId, id_usuario: userId }).del();
      await trx("t_projeto_usuario").where("id_projeto", projetoId).del();
      await trx("t_projeto_convite").where("id_projeto", projetoId).del();
      await trx("t_projeto").where("id_projeto", projetoId).del();
  
      await trx.commit();
      return { sucesso: true };
      
    } catch (err) {
      await trx.rollback();
      console.error("Erro ao deletar projeto completo:", err.message);
      throw new Error("Erro ao deletar projeto.");
    }
  } 
  
  async sendProject(projetoId, userId) {

    const trx = await database.transaction();
  
    try {

      const atualizado = await trx("t_projeto_usuario")
        .where({ id_projeto: projetoId, id_usuario: userId })
        .update({ ds_status: "entregue" });
  
      await trx.commit();
      return atualizado;
  
    } catch (error) {
      await trx.rollback();
      console.error("Erro ao entregar projeto:", error);
      throw error;
    }
  }
  
  async finalizeProject(projetoId) {

    const trx = await database.transaction();
  
    try {

      const atualizado = await trx("t_projeto_usuario")
        .where({ id_projeto: projetoId })
        .update({ ds_status: "finalizado" });
  
      await trx.commit();
      return atualizado;
  
    } catch (error) {
      await trx.rollback();
      console.error("Erro ao finalizar projeto:", error);
      throw error;
    }
  }

  async verifyStatus(projetoId) {

    const trx = await database.transaction();
  
    try {
      
      const projeto = await trx("t_projeto_usuario")
        .where({ id_projeto: projetoId })
        .first();
  
      if (!projeto) {
        throw new Error('Projeto não encontrado.');
      }

      if (projeto.ds_status === 'finalizado') { //Mexi aqui!
        throw new Error('Este projeto já foi entregue e não pode ser corrigido novamente.');
      }
      
      await trx.commit();
      return projeto;

    } catch (error) {
      await trx.rollback();
      console.error('Erro ao verificar status do projeto:', error);
      throw error;
    }
  }

  async updateProject({ idProjeto, novoAutor, novaData }) {
    const trx = await database.transaction();
  
    try {
      await trx("t_projeto")
        .where({ id_projeto: idProjeto })
        .update({
          nm_autores: trx.raw("CONCAT(nm_autores, ', ', ?)", [novoAutor]),
          dt_entrega: novaData,
        });
  
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      console.error("Erro ao atualizar projeto:", err);
      throw err;
    }
  }
  
  async findNameProjectByUserId(userId){
    return await database("t_projeto as P")
      .join("t_projeto_usuario as U", "P.id_projeto", "U.id_projeto")
      .select(
        "P.nm_projeto",
        "P.id_projeto"
      )
      .where("U.id_usuario", userId)
      .andWhere("P.st_lixo", "!=", true);
  }

  async findMembers(projetoId){

    return await database("t_projeto as P")
    .join("t_projeto_usuario as PU", "P.id_projeto", "PU.id_projeto")
    .select(
      "PU.id_usuario"
    )
    .where("PU.id_projeto", projetoId);
  }

  async trash(projetoId, userId) {
  const trx = await database.transaction();

  try {
    const updatedRows = await trx("t_projeto")
      .where({ id_projeto: projetoId, id_criador: userId }) // só criador pode alterar
      .update({ st_lixo: true });

    await trx.commit();

    // se não atualizou nenhuma linha, é porque o usuário não é criador
    return updatedRows > 0;
  } catch (error) {
    await trx.rollback();
    console.error("Erro ao enviar projeto para a lixeira:", error);
    throw error;
  }
  }

  async findTrash(userId){
    return await database("t_projeto as P")
      .join("t_projeto_usuario as U", "P.id_projeto", "U.id_projeto")
      .select(
        "P.id_projeto",
        "P.nm_projeto",
      )
      .where("U.id_usuario", userId)
      .andWhere("P.st_lixo", true);
  }

  async restore(idProjeto) {
  const trx = await database.transaction();

  try {
    await trx("t_projeto")
      .where({ id_projeto: idProjeto })
      .update({ st_lixo: false });

    await trx.commit();
    return true; // apenas retorna sucesso
  } catch (error) {
    await trx.rollback();
    console.error("Erro ao restaurar:", error);
    throw error;
  }
  }

  async editProject({ idProjeto, name, description }) {

    const trx = await database.transaction();
  
    try {
      await trx("t_projeto")
        .where({ id_projeto: idProjeto })
        .update({
          nm_projeto: name,
          ds_projeto: description,
        });
  
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      console.error("Erro ao atualizar projeto:", err);
      throw err;
    }
  }


}

module.exports = new Project();