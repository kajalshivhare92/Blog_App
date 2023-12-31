const { unlinkSync } = require("fs")
const userValSchema = require("./userValSchema");
const userlogInValSchema = require("./userValSchema");

module.exports = {
    registerUserValidation: async (req, res, next) => {
        let isValid = await userValSchema.registerUser.validate(req.body, {
            aboutEarly: false
        });
        if (isValid.error) {
            res.status(403).json({
                success: false,
                message: isValid.error.details[0].message,
            })
        } else {
            next();
        }
    },

logInUserValidation: async (req, res, next) => {
        let isValid = await userlogInValSchema.userlogIn.validate(req.body, {
            aboutEarly: false,
        });
        if (isValid.error) {
            res.status(403).json({
                success: false,
                message: isValid.error.details[0].message,
            });
        } else {
            next();
        }

    }
}






