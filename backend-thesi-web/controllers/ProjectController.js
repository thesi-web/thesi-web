require("dotenv").config();
const Project = require("../models/Project");
const { uploadService } = require('../services/uploadService');


class ProjectController {

  async create(req, res) {
    try {
      const userId = req.userId;
      const { name, authors, objective, user, platform } = req.body;
  
      const templates = req.files["template"] || [];
  
      if (templates.length === 0) {
        return res.status(400).send("Não é possível criar um projeto sem imagens");
      }
  
      if (templates.length > 5) {
        return res.status(400).send("Máximo de 5 arquivos e 5 protótipos permitidos");
      }
  
      //Converte authors para array de inteiros
      const participants = typeof authors === "string"
        ? authors.split(',').map((id) => parseInt(id.trim())).filter((id) => !isNaN(id))
        : Array.isArray(authors)
          ? authors.map((id) => parseInt(id)).filter((id) => !isNaN(id))
          : [];
  
      const uploader = new uploadService();
  
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
        authors: participants, // <- agora é array de ints
        objective,
        user,
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
      const resultado = await Project.finalizeProject(projetoId, userId);
  
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

    const { ids } = req.body;
  
    try {
      await db.query('UPDATE t_heuristica SET st_correcao = true WHERE id IN (?)', [ids]);
      res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar' });
    }
  
  }
  
}

module.exports = new ProjectController();