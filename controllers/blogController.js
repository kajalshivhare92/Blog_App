const { unlinkSync } = require("fs")
const blogCommentSchema = require("../models/blogCommentSchema");
const blogSchema = require("../models/blogSchema");
const { title } = require("process");

module.exports = {
    createBlog: async (req, res) => {
        try {
            const newBlog = new blogSchema(req.body);
            newBlog.title = req.body.title
                .trim()
                .split(" ")
                .map((data) => {
                    return data.charAt(0).toUpperCase() + data.slice(1);
                })
                .join(" ");
            const checkBlog = await blogSchema.findOne({
                title: newBlog.title,
            });
            if (checkBlog != null) {
                req.file ? unlinkSync(req.file.path) : null;
                res.status(409).json({
                    success: false,
                    message: `This blog is already exists`,
                });
            } else {
                const filepath = `/uploads/blog/${req.file.filename}`;
                newBlog.blogImage = filepath;
                const blog = await newBlog.save();
                res.status(201).json({
                    success: true,
                    message: "Blog created",
                    addedBlog: blog,
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error occur: ${error.message}`,
            });

        }
    },

    blogDetail: async (req, res) => {
        blogID = req.params.id;
        userID = req.params.user;
        try {
            const blogData = await blogSchema.findById(req.params.id);
            const commentDatalist = await blogCommentSchema.find({ blogID: req.params.id })
                .populate({ path: "userID", select: "userName profilePic" });
            res.status(200).json({
                success: true,
                message: "Comment list fetched successfully",
                blog: blogData,
                commentlist: commentDatalist,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                mesage: `Comment not Found ${error.mesaage}`,
            })
        }
    },

    blogList: async (req, res) => {
        try {
            const showAllBlogs = await blogSchema.find();
            const totalBlogs = await blogSchema.find().count();
            res.status(200).json({
                success: true,
                message: "All blogs",
                count: totalBlogs,
                blogList: showAllBlogs,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error occur : ${error.mesaage}`,
            })
        }
    },

    searchBlog: async (req, res) => {
        const title = req.body.title;
        try {
            const blogs = await blogSchema.find({
                title: { $regex: `^${title}`, $options: "i" },
            });
            if (blogs.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Searched blogs",
                    blogs: blogs,
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: `No blog found`,
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error occur ${error.message}`,
            });
        }
    },

    updateBlog: async (req, res) => {
        const { id } = req.params;
        const updateFields = req.body;
        try {
            const updatedBlog = await blogSchema.findByIdAndUpdate(id, updateFields, {
                new: true,
            });
            if (!updatedBlog) {
                res.status(404).json({
                    message: 'Blog not found'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Blog updated successfully"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    deleteBlog: async (req, res) => {
        const { id } = req.params;
        const deleteFields = req.body;
        try {
            const deletedBlog = await blogSchema.findByIdAndDelete(id, deleteFields, {
                new: true,
            });
            if (!deletedBlog) {
                res.status(404).json({
                    message: 'Blog not found'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Blog deleleted successfully"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    likeBlog: async (req, res) => {
        const { like } = req.body
        try {
            const blog = await blogSchema.findById(req.params.id);
            if (like == 1) {
                await blogSchema.findByIdAndUpdate(
                    req.params.id,
                    { like: ++blog.like },
                    { new: true }
                );
                res.status(202).json({
                    success: true,
                    message: "You have liked this blog",
                    like: blog.like,
                });
            } else {
                await blogSchema.findByIdAndUpdate(
                    req.params.id,
                    { like: --blog.like },
                    { new: true }
                );
                res.status(202).json({
                    success: true,
                    message: "You have disliked this blog",
                    like: blog.like,
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error occur ${error.message}`,
            });
        }
    },
};





