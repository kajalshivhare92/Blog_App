const express = require("express")
const blogRouter = express.Router()

const blogDataValidations = require("../validations/blog/blogDataValidations")
const { userAuthentication } = require("../middleware/authToken")
const { authorizeAdmin } = require("../middleware/authorization")
const { blogUpload } = require("../middleware/blogImageStorage")
let blogController = require("../controllers/blogController")




blogRouter.post("/create", blogUpload.single("blogImage"), userAuthentication, authorizeAdmin, blogDataValidations.createBlogValidation, blogController.createBlog)
blogRouter.get("/details/:id", userAuthentication, blogController.blogDetail)
blogRouter.delete("/delete/:id", blogController.deleteBlog)
blogRouter.put("/update/:id", blogController.updateBlog)
blogRouter.post("/like/:id", blogController.likeBlog)
blogRouter.post("/title", blogController.searchBlog)
blogRouter.get("/list", blogController.blogList)

module.exports = blogRouter

