const database = require("../database/connection");
const { uploadService } = require("../services/uploadService");
const uploader = new uploadService();
require("dotenv").config();

class Project {

  async create(project, userId) {
    try {
      const result = await database.transaction(async (trx) => {
        const [inserted] = await trx("t_projeto")
          .insert({
            nm_projeto: project.name,
            nm_autores: project.authors,
            ds_projeto: project.objective,
            ds_usuario: project.user,
            ds_plataforma: project.platform,
            id_criador: userId
          })
          .returning("id_projeto");
  
        const projectId = inserted.id_projeto;
  
        await trx("t_projeto_usuario").insert({
          id_projeto: projectId,
          id_usuario: userId
        });

        const allParticipants = project.authors || [];
        const uniqueParticipants = [...new Set(allParticipants)].filter(p => p !== userId);

        for (const participantId of uniqueParticipants) {
          await trx("t_projeto_usuario").insert({
            id_projeto: projectId,
            id_usuario: participantId,
          });
        }
        
        for (const image of project.templates) {

          await uploader.execute(image.originalname); 
        
          const imageUrl = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${image.originalname}`;
        
          await trx("t_imagens").insert({
            id_projeto: projectId,
            id_usuario: userId,
            nm_imagem: image.originalname,
            ds_caminho: imageUrl,
          });
        }
        return { projectId }; // <- esse retorno vai para a constante "result"
      });
      return result; // <- aqui você retorna o resultado para o controller
    } catch (err) {
      console.error("Não foi possível criar o projeto:", err);
      throw err;
    }
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

  async findById(projetoId, userId) {
    try {
      const projeto = await database("t_projeto as P")
        .join("t_usuario as U", "P.id_criador", "U.id_usuario"  )
        .join("t_projeto_usuario as PU", "P.id_projeto", "PU.id_projeto")
        .select(
          "P.id_projeto",
          "P.nm_projeto",
          "P.nm_autores",
          "P.ds_projeto",
          "P.ds_usuario",
          "P.ds_plataforma",
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
        .select("ds_caminho");

        // Adiciona ao objeto
        projeto.imagens = imagens.map(img => img.ds_caminho);
  
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
      await trx("t_projeto_usuario").where({ id_projeto: projetoId, id_usuario: userId }).del();
      await trx("t_projeto").where("id_projeto", projetoId).del();
  
      await trx.commit();
      return { sucesso: true };
  
    } catch (err) {
      await trx.rollback();
      console.error("Erro ao deletar projeto completo:", err);
      throw err;
    }
  }
  
  async finalizeProject(projetoId, userId) {

    const trx = await database.transaction();
  
    try {

      const atualizado = await trx("t_projeto_usuario")
        .where({ id_projeto: projetoId, id_usuario: userId })
        .update({ ds_status: "FINALIZADO" });
  
      await trx.commit();
      return atualizado;
  
    } catch (error) {
      await trx.rollback();
      console.error("Erro ao finalizar projeto:", error);
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
      .where("U.id_usuario", userId);
  }
}

module.exports = new Project();


//Falta refatorar a recuperação dos projetos de um projessor: 
//Antes só tinha a professora Ana com id 1, agora teremos vários professores, cada um com um ID diferente. 
//Pensar em como vamos colocar isso no banco/recuperar.