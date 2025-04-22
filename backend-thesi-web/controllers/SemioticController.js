const fs = require("fs");
const Semiotic = require("../models/Semiotic")

class SemioticController {

    async create(req, res) {
        try {
          const userId = req.userId;
          const { signo, esperada, possivel, quebra, recomendacaoSemiotica, imagem } = req.body;
          const id = req.headers["projeto-id"];
    
          if (!imagem) {
            return res.status(400).json({ erro: "URL da imagem não fornecida" });
          }
    
          const semiotic = {
            id,
            userId,
            signo,
            esperada, 
            possivel, 
            quebra,
            recomendacaoSemiotica,
            imagem,
          };
    
          await Semiotic.create(semiotic);
          res.status(201).json({ mensagem: "Marcação semiótica criada com sucesso!" });
    
        } catch (err) {
          console.error("Erro na criação de uma marcação semiótica:", err);
          res.status(500).json({ erro: "Erro ao criar uma marcação semiótica" });
        }
      }
    
    async getByProject(req, res) {
  
      const userId = req.userId;
  
      const { projetoId } = req.params;
  
      try {
      
        const semiotics = await Semiotic.findByProject(userId, projetoId);
        res.json(semiotics);
  
      } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar marcações semióticas", details: err.message });
      }
    }
  
    async correct(req, res) {
  
      const { idSemiotica, observacao } = req.body;
  
      const userId = req.userId;
  
      if (!userId) {
          return res.status(401).json({ erro: "Token não fornecido" });
      }
  
      if (!idSemiotica || !observacao || observacao.trim() === "") {
        return res.status(400).json({ erro: "Parâmetros ausentes ou inválidos" });
      }
  
      try {
        const linhasAfetadas = await Semiotic.corrigir({ idSemiotica, userId, observacao });
  
        if (linhasAfetadas === 0) {
          return res.status(404).json({ erro: "Marcação semiótica não encontrada ou você não tem permissão." });
        }
  
        res.json({ mensagem: "Marcação semiótica corrigida com sucesso!" });
  
      } catch (err) {
        res.status(500).json({ erro: "Erro ao corrigir marcação semiótica", detalhes: err.message });
      }
  }
}

module.exports = new SemioticController();