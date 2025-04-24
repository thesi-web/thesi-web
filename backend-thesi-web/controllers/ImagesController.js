const Images = require("../models/Images");
const path = require("path");
const fs = require("fs");
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,     // ou direto na string, se estiver testando local
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // ou a sua região
});

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

  async upload(req, res) {

    try {
    
      const file = req.file;

      if (!file) {
        return res.status(400).json({ erro: 'Arquivo não encontrado' });
      }
  
      const fileContent = fs.readFileSync(file.path);
  
      const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `heuristic/${fileName}`,
        Body: fileContent,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
  
      const data = await s3.upload(params).promise();
  
      fs.unlinkSync(file.path);
  
      res.json({ url: data.Location });
    } catch (err) {
      console.error('Erro ao subir imagem:', err);
      res.status(500).json({ erro: 'Erro ao subir imagem' });
    }
  }
  

}

module.exports = new ImagesController();
