const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const ImagesController = require("../controllers/ImagesController");
const upload = require("../middlewares/upload");


router.post("/images/:projetoId", authorization, upload.array("template", 5), ImagesController.addImage); 
router.get("/project/images/:projetoId", authorization, ImagesController.getByProject); 
//  tentando fazer um SELECT incluindo a coluna I.st_avaliacao, mas essa coluna não existe na tabela t_imagens.
// precisa rever no frontend

router.post('/upload', upload.single('imagem'), ImagesController.upload);
router.get("/images/:idImagem", authorization, ImagesController.getById);
router.get("/imagem/heuristica/:id", ImagesController.getHeuristicImage);
router.get("/imagem/semiotica/:id", ImagesController.getSemioticImage);
router.put("/avaliar", authorization, ImagesController.evaluateImagem);

module.exports = router;