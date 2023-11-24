let express = require("express")
let blogcommentController = require("../controllers/blogCommentController")

const commentRouter = express.Router();
commentRouter.post("/addcomment",blogcommentController.addComment)

module.exports = commentRouter;
