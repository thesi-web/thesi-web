const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const FilesController = require("../controllers/FilesController");

router.get("/files/:projetoId", authorization, FilesController.getByProjectId); //OK 07-04-2025

module.exports = router;