const express = require("express");
const {
  codeController,
  explanationController,
  optimizationController,
  commentsController,
  refactorController,
  generateTitleController,
  chatController,
} = require("../controllers/openaiController.js");

const router = express.Router();

//router
router.post("/converter", codeController);
router.post("/explanation", explanationController);
router.post("/optimization", optimizationController);
router.post("/commenter" , commentsController)
router.post("/refactor" , refactorController)
router.post("/title" , generateTitleController)
router.post("/chat" , chatController) 

module.exports = router;
