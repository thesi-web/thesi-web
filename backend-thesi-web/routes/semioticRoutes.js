const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const upload = require("../middlewares/upload");
const SemioticController = require("../controllers/SemioticController");

router.post('/semiotic', authorization, upload.array('imagens', 5), SemioticController.create);
router.get("/semiotic/:projetoId", authorization, SemioticController.getByProject);
router.put("/semiotic", authorization, SemioticController.correct);

module.exports = router;
