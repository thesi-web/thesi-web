require("dotenv").config();
const Heuristic = require("../models/Heuristic");
const Project = require("../models/Project");
const Semiotic = require("../models/Semiotic");
const { UploadService } = require('../services/uploadService');


class ProjectController {

  async create(req, res) {
    try {
      const userId = req.userId;
      const { name, authors, objective, platform } = req.body;
  
      const templates = req.files["template"] || [];
  
      if (templates.length > 5) {
        return res.status(400).send("Máximo de 5 protótipos permitidos");
      }
  
      //Converte authors para array de inteiros
      const participants = Array.isArray(authors)
      ? authors.map((id) => parseInt(id)).filter((id) => !isNaN(id))
      : typeof authors === "string"
        ? authors.split(',').map((id) => parseInt(id.trim())).filter((id) => !isNaN(id))
        : [];
  
      const uploader = new UploadService();
  
      const uploadedTemplates = [];
      for (const file of templates) {
        await uploader.execute(file.filename);
        const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${file.filename}`;
        uploadedTemplates.push({
          originalname: file.originalname,
          url: url
        });
      }
  
      const project = {
        name,
        authors: participants,
        objective,
        platform,
        templates: uploadedTemplates
      };
  
      const result = await Project.create(project, userId);
  
      res.status(201).json({ msg: "Projeto criado com sucesso", id: result.projectId });
  
    } catch (err) {
      console.error("Erro na criação do projeto:", err);
      res.status(500).json({ erro: "Erro ao criar projeto" });
    }
  }  

  async answerInvite(req, res) {
    try {
      const { token, resposta } = req.query;

      console.log("[CONVITE] Resposta recebida:", resposta, "para token:", token);

      if (!token || !["aceito", "recusado"].includes(resposta)) {
        return res.status(400).json({ erro: "Token inválido ou resposta inválida" });
      }

      const result = await Project.answer(token, resposta);

      console.log("[CONVITE] Convite atualizado com sucesso:", result);
      res.json({ msg: "Resposta registrada com sucesso" });
    } catch (err) {
      console.error("[CONVITE] Erro ao responder convite:", err);
      res.status(500).json({ erro: err.message });
    }
  }

  async getAll(req, res) {
    try {
       
      const userId = req.userId; 

      const projetos = await Project.findByUserId(userId);
      res.json(projetos);
    } catch (err) {
      console.error("Erro no controller:", err);
      res.status(500).json({ erro: "Erro ao buscar os projetos" });
    }
  }

  async getById(req, res) {
    try {
      const { projetoId } = req.params;
      const userId = req.userId; // preenchido pelo middleware
  
      const projeto = await Project.findById(projetoId, userId);
  
      if (!projeto) {
        return res.status(404).json({ erro: "Projeto não encontrado ou acesso negado" });
      }
  
      res.json(projeto);
      
    } catch (err) {
      console.error("Erro ao recuperar projeto:", err);
      res.status(500).json({ erro: "Erro ao buscar o projeto" });
    }
  }
  
  async getByProfessorId(req, res) {   
      try {
        if (req.userRole !== "professor") {
        return res.status(403).json({ erro: "Acesso negado. Apenas professores podem acessar." });
      }

      const professorId = req.userId;
  
      const projeto = await Project.findByProfessorId(professorId);
  
      if (!projeto) {
        return res.status(404).json({ erro: "Projeto não encontrado ou acesso negado" });
      }
  
      res.json(projeto);
      
    } catch (err) {
      console.error("Erro ao recuperar projeto:", err);
      res.status(500).json({ erro: "Erro ao buscar o projeto" });
    }
  }

  async delete(req, res) {

    const projetoId = req.params.id;
    const userId = req.userId; 
  
    try {
      const resultado = await Project.deleteProject(projetoId, userId);
  
      if (resultado.sucesso) {
        return res.json({ mensagem: "Projeto deletado com sucesso!" });
      }
  
      res.status(400).json({ erro: "Erro inesperado ao deletar" });
  
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar projeto", details: err });
    }
  }
  
  async finalize(req, res) {

    const { projetoId } = req.params;
    const userId = req.userId;
  
    if (!projetoId || !userId) {
      return res.status(400).json({ erro: "Parâmetros ausentes" });
    }
  
    try {
      const resultado = await Project.sendProject(projetoId, userId);
  
      if (resultado === 0) {
        return res.status(404).json({ erro: "Projeto não encontrado ou não pertence ao usuário" });
      }
  
      res.json({ mensagem: "Projeto finalizado com sucesso!" });
  
    } catch (err) {
      res.status(500).json({ erro: "Erro ao finalizar projeto", detalhes: err.message });
    }
  }

  async update(req, res) {
    const { idProjeto, name, date } = req.body;
    const userId = req.userId;
  
    if (!idProjeto || !name || !date) {
      return res.status(400).json({ erro: "Parâmetros ausentes" });
    }
  
    try {
      await Project.updateProject({
        idProjeto,
        novoAutor: name,
        novaData: date,
      });
  
      res.json({ mensagem: "Projeto atualizado com sucesso!" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar projeto", detalhes: err.message });
    }
  }

  async getNameProject(req, res) {
    try {
       
      const userId = req.userId; // preenchido pelo middleware

      const projetos = await Project.findNameProjectByUserId(userId);
      res.json(projetos);
    } catch (err) {
      console.error("Erro no controller:", err);
      res.status(500).json({ erro: "Erro ao buscar os projetos" });
    }
  }

  async consolidar(req, res) {

    const { heuristics, semiotics, idProjeto } = req.body;
  
    try {
      
      for (const id of heuristics) {
        await Heuristic.correctHeuristic({ idHeuristica: id });
     }
     
     for (const id of semiotics) {
        await Semiotic.correctSemiotic({ idSemiotica: id });
     }
     
     await Project.finalizeProject(idProjeto);

      res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar' });
    }
  
  }
  
  async getMarks(req, res) {
    const { projetoId } = req.params;
  
    try {
      // Verifica se o status do projeto é válido para continuar
      await Project.verifyStatus(projetoId);
  
      // Buscar as marcações de semioticas e heurísticas
      const semiotics = await Semiotic.findByProject(projetoId);
      const heuristics = await Heuristic.findByProject(projetoId);
  
      // Retorna as marcações encontradas
      res.json({ semiotics, heuristics });
  
    } catch (err) {
      // Se ocorrer erro, envia uma resposta de erro detalhada
      console.error("Erro ao buscar marcações:", err);
      res.status(500).json({
        erro: "Erro ao buscar marcações",
        detalhes: err.message || 'Detalhes não disponíveis',
      });
    }
  }

  async moveToTrash(req, res) {
  const { idProjeto } = req.body;
  const userId = req.userId; // veio do middleware de autorização

  try {
    const success = await Project.trash(idProjeto, userId);

    if (!success) {
      return res.status(403).json({ error: "Você não tem permissão para mover este projeto para a lixeira." });
    }

    res.status(200).json({ message: "Movido para a lixeira com sucesso" });
  } catch (err) {
    console.error("Erro ao mover para a lixeira:", err);
    res.status(500).json({ error: "Erro ao mover para a lixeira" });
  }
  }

  async showTrash(req, res) {
  try {
    const userId = req.userId; // preenchido pelo middleware
    
    const trash = await Project.findTrash(userId);

    // Sempre retorna 200, mesmo que venha vazio
    res.status(200).json(trash);

  } catch (err) {
    console.error("Erro ao recuperar projetos:", err);
    res.status(500).json({ erro: "Erro ao buscar os projetos" });
  }
  }

  async restore(req, res) {
  try {
    const { idProjeto } = req.body;

    await Project.restore(idProjeto); // chama o model

    return res.status(200).json({ message: "Projeto restaurado com sucesso" });
  } catch (err) {
    console.error("Erro ao restaurar:", err);
    return res.status(500).json({ error: "Erro ao restaurar projeto" });
  }
  }

  async edit(req, res) {
    const { idProjeto, name, description } = req.body;

    if (!idProjeto || !name?.trim() || !description?.trim()) {
      return res.status(400).json({ error: "Parâmetros ausentes ou inválidos" });
    }

    try {
      await Project.editProject({ idProjeto, name, description });
      res.status(200).json({ message: "Projeto atualizado com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar projeto", details: err.message });
    }
  }

}

module.exports = new ProjectController();
