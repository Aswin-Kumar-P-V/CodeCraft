const express = require("express");
const {
  registerContoller,
  loginContoller,
  logoutContoller,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerContoller);

router.post("/login", loginContoller);

router.post("/logout", logoutContoller);

module.exports = router;
