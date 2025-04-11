const fs = require("fs");
const Heuristic = require("../models/Heuristic");

class HeuristicController {

  async create(req, res) {
    try {
      const userId = req.userId;
      const { heuristica, anotacao, recomendacao, severidade } = req.body;
      const id = req.headers["projeto-id"];
      const imagem = req.file;

      if (!imagem) {
        return res.status(400).json({ erro: "Imagem não fornecida" });
      }

      const bufferImagem = fs.readFileSync(imagem.path);
      fs.unlinkSync(imagem.path);

      const heuristic = {
        id,
        userId,
        heuristica,
        anotacao,
        recomendacao,
        severidade,
        imagem: bufferImagem,
      };

      await Heuristic.create(heuristic);
      res.status(201).json({ mensagem: "Marcação heurística criada com sucesso!" });

    } catch (err) {
      console.error("Erro na criação de uma marcação heurística:", err);
      res.status(500).json({ erro: "Erro ao criar uma marcação heurística" });
    }
  }

  async getByProject(req, res) {

    const userId = req.userId;

    const { projetoId } = req.params;

    try {
    
      const heuristics = await Heuristic.findByProject(userId, projetoId);
      res.json(heuristics);

    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar marcações heurísticas", details: err.message });
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
}

module.exports = new HeuristicController();
