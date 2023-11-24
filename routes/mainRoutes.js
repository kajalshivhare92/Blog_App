const express = require("express");
const commentRouter = require("./blogCommentRoutes")
const userRouter = require("./userRoutes");
const blogRouter = require("./blogRoutes")





const mainRouter = express.Router();
mainRouter.use("/comment", commentRouter)
mainRouter.use("/user", userRouter)
mainRouter.use("/blog", blogRouter)

module.exports = mainRouter;
