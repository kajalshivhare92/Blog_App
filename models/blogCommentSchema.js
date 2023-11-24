const mongoose = require("mongoose");

const blogCommentSchema = mongoose.Schema({
    blogCommentSubject: {
        type: String,
        required: true,
    },
    blogComment: {
        type: String,
        required: true,
    },
    blogCommentRating: {
        type: String,
        required: true,
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    blogID: {
        type: mongoose.Types.ObjectId,
        ref: "blog",
        required: true,
    },
    isActive: {
        type: String,
        default: true,
    },
})
blogCommentSchema.set("timestamps", true);

module.exports = mongoose.model("blogcomment", blogCommentSchema);
