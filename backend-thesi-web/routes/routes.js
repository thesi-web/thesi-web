const express = require("express")
const router = express.Router();

const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const heuristicRoutes = require("./heuristicRoutes");
const semioticRoutes = require("./semioticRoutes");
const imageRoutes = require("./imageRoutes");
const filesRoutes = require("./filesRoutes");
const notificationRoutes = require("./notificationRoutes");

router.use(userRoutes);
router.use(projectRoutes);
router.use(heuristicRoutes);
router.use(semioticRoutes);
router.use(imageRoutes);
router.use(filesRoutes);
router.use(notificationRoutes);

module.exports = router;