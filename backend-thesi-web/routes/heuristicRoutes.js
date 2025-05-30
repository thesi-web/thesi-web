const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const upload = require("../middlewares/upload");
const HeuristicController = require("../controllers/HeuristicController");

router.post('/heuristic', authorization, upload.array('imagens', 10), HeuristicController.create);
router.get("/heuristic/:projetoId", authorization, HeuristicController.getByProject);
router.put("/heuristic", authorization, HeuristicController.correct);
router.delete('/heuristic/:idHeuristica', authorization, HeuristicController.delete);

module.exports = router;