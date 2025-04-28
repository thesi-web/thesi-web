const fs = require("fs");
const Heuristic = require("../models/Heuristic");

class HeuristicController {

  async create(req, res) {
  try {
    const userId = req.userId;
    const { heuristica, anotacao, recomendacao, severidade, imagem } = req.body;
    const id = req.headers["projeto-id"];

    if (!imagem) {
      return res.status(400).json({ erro: "URL da imagem não fornecida" });
    }

    const heuristic = {
      id,
      userId,
      heuristica,
      anotacao,
      recomendacao,
      severidade,
      imagem, // ← já é a URL da AWS, salva direto
    };

    await Heuristic.create(heuristic);
    res.status(201).json({ mensagem: "Marcação heurística criada com sucesso!" });

  } catch (err) {
    console.error("Erro na criação de uma marcação heurística:", err);
    res.status(500).json({ erro: "Erro ao criar uma marcação heurística" });
  }
  }

  async getByProject(req, res) {
  
    const { projetoId } = req.params;

    try {
    
      const semiotics = await Heuristic.findByProject(projetoId);
      res.json(semiotics);

    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar marcações semióticas", details: err.message });
    }
  }

  async correct(req, res) {

    const { idHeuristica, observacao } = req.body;

    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    if (!idHeuristica || !observacao || observacao.trim() === "") {
      return res.status(400).json({ erro: "Parâmetros ausentes ou inválidos" });
    }

    try {
      const linhasAfetadas = await Heuristic.corrigir({ idHeuristica, userId, observacao });

      if (linhasAfetadas === 0) {
        return res.status(404).json({ erro: "Marcação heurística não encontrada ou você não tem permissão." });
      }

      res.json({ mensagem: "Marcação heurística corrigida com sucesso!" });

    } catch (err) {
      res.status(500).json({ erro: "Erro ao corrigir marcação heurística", detalhes: err.message });
    }
  }

  async delete(req, res) {

    const { idHeuristica } = req.params;
  
    if (!idHeuristica) {
      return res.status(400).json({ erro: "Id da heurística não fornecido" });
    }
  
    try {
      await Heuristic.deleteById(idHeuristica);
  
      res.json({ mensagem: "Marcação heurística deletada com sucesso!" });
  
    } catch (err) {
      res.status(500).json({ 
        erro: "Erro ao deletar marcação heurística", 
        detalhes: err.message 
      });
    }
  }  

}

module.exports = new HeuristicController();
