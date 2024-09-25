var express = require("express");
var router = express.Router();

//controller
const userController = require("../controllers/userController");

router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);
router.get("/:id", userController.userInfo);

module.exports = router;
