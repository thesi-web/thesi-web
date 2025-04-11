const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const ProjectController = require("../controllers/ProjectController");
const upload = require("../middlewares/upload");

router.post("/project", upload.fields([{ name: "template", maxCount: 5 }, { name: "modeling", maxCount: 5 },]), authorization, ProjectController.create); //OK 07-04-2025
router.get('/project', authorization, ProjectController.getAll); //OK 07-04-2025
router.get('/project/:projetoId', authorization, ProjectController.getById); //OK 07-04-2025
router.delete("/project/:id", authorization, ProjectController.delete); //OK 07-04-2025
router.put("/project/:projetoId", authorization, ProjectController.finalize); //OK 07-04-2025
router.put("/project", authorization, ProjectController.update);
router.get("/all", authorization, ProjectController.getNameProject);

module.exports = router;