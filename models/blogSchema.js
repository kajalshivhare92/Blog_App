const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    like: {
        type: Number,  
        default: 0,    
    },  
    isActive: {
        type: String,
        default: true,
    },
});
blogSchema.set("timestamps", true);

module.exports = mongoose.model("blog", blogSchema);
