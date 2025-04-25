const express = require("express");
const authorization = require("../middlewares/authorization");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/user", UserController.create);
router.post("/login", UserController.login); 
router.post("/logout", UserController.logout);
router.get("/user", authorization, UserController.getUserInfo); 
router.post("/request/password/change", UserController.requestPasswordChange); 
router.post("/password/change", UserController.changePassword); 
router.get("/search/user", authorization, UserController.searchUser);
router.post("/request/token", UserController.requestToken);
router.post("/confirm/token", UserController.confirmToken);

module.exports = router;