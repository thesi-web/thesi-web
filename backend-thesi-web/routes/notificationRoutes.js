const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const NotificationsController = require("../controllers/NotificationsController");

router.get("/notifications/", authorization, NotificationsController.getAll);

module.exports = router;
