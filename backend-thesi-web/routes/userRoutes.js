const express = require("express");
const authorization = require("../middlewares/authorization");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/user", UserController.create); //OK 06-04-2025
router.post("/login", UserController.login); //OK 06-04-2025
router.post("/logout", UserController.logout); //OK 06-04-2025 -> Simbólico pois o JWT encerra a sessão no fronted!
router.get("/user", authorization, UserController.getUserInfo); //OK 06-04-2025
router.post("/request/password/change", UserController.requestPasswordChange); //OK 06-04-2025
router.post("/password/change", UserController.changePassword); // -> ver como o token foi gerado no frontend pra testar!
router.get("/search/user", authorization, UserController.searchUser);
router.post("/request/token", UserController.requestToken);
router.post("/confirm/token", UserController.confirmToken);

module.exports = router;