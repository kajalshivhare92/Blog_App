const joi = require("joi")

const blogCreateValSchema = {
    createBlog: joi
        .object({
            title: joi
                .string()
                .min(2)
                .max(15)
                .message({
                    "string.min": "{#lable} should contain at least {#limit} chracter",
                })
                .required(),
            description: joi
                .string()
                .min(2)
                .max(40)
                .message({
                    "string.min": "{#lable} should contain at least {#limit} chracter",
                })
                .required(),
        })
        .unknown(true),
};

module.exports = blogCreateValSchema;



