const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const NotificationsController = require("../controllers/NotificationsController");

router.get("/notifications", authorization, NotificationsController.getAll);
router.put("/notifications/read", authorization, NotificationsController.markAsRead);

module.exports = router;
