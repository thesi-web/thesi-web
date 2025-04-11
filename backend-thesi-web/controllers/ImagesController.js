const Images = require("../models/Images");
const path = require("path");
const fs = require("fs");

class ImagesController {

  async getById(req, res) {
    try {

      const userId = req.userId;

      const { idImagem } = req.params;

      if (!idImagem) {
        return res.status(400).json({ erro: "Parâmetro idImagem ausente" });
      }

      const imagem = await Images.findById(idImagem);

      if (!imagem) {
        return res.status(404).json({ erro: "Imagem não encontrada." });
      }

      const caminhoAbsoluto = path.resolve(__dirname, "..", "..", imagem.ds_caminho);

      // Verifica se a imagem existe no disco
      if (!fs.existsSync(caminhoAbsoluto)) {
        return res.status(404).json({ erro: "Arquivo da imagem não encontrado." });
      }

      res.setHeader("Content-Type", "image/png");
      res.sendFile(caminhoAbsoluto);

    } catch (err) {
      console.error("Erro ao buscar imagem:", err);
      res.status(500).json({ erro: "Erro interno ao buscar imagem" });
    }
  }

  async getByProject(req, res) {
    try {
      const userId = req.userId;
      const { projetoId } = req.params;

      const imagens = await Images.findByProjectId(userId, projetoId);
      res.json(imagens);

    } catch (err) {
      console.error("Erro ao buscar as imagens do projeto:", err);
      res.status(500).json({ erro: "Erro ao buscar as imagens do projeto" });
    }
  }

  async getHeuristicImage(req, res) {
    try {
      const { id } = req.params;
      const result = await ImageActions.getHeuristicImage(id);

      if (!result) return res.status(404).json({ erro: "Imagem não encontrada" });

      const imagemBase64 = Buffer.from(result.ds_caminho).toString("base64");
      res.json({ imagem: `data:image/jpeg;base64,${imagemBase64}` });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao consultar a imagem", details: err.message });
    }
  }

  async getSemioticImage(req, res) {
    try {
      const { id } = req.params;
      const result = await ImageActions.getSemioticImage(id);

      if (!result) return res.status(404).json({ erro: "Imagem não encontrada" });

      const imagemBase64 = Buffer.from(result.ds_caminho).toString("base64");
      res.json({ imagem: `data:image/jpeg;base64,${imagemBase64}` });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao consultar a imagem", details: err.message });
    }
  }

  async evaluateImagem(req, res) {
    try {
      const { idImagem } = req.body;
      if (!idImagem) return res.status(400).json({ erro: "ID da imagem não fornecido" });

      const resultado = await ImageActions.evaluateImagem(idImagem);

      if (resultado === 0) {
        return res.status(404).json({ erro: "Imagem não encontrada" });
      }

      res.send("Imagem avaliada com sucesso!");
    } catch (err) {
      res.status(500).json({ erro: "Erro ao avaliar imagem", detalhes: err.message });
    }
  }

}

module.exports = new ImagesController();
