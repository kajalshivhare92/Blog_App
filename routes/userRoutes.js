const express = require('express')
const userRouter = express.Router();

const {
    registerUserValidation,
    logInUserValidation,
} = require('../validations/user/userDataValidations');
const { userUpload } = require('../middleware/userImageStorage');
const userController = require('../controllers/userController');

userRouter.post("/create", userUpload.single("profilePic"), registerUserValidation, userController.createUser);
userRouter.post("/resetpasswordEmail", userController.sendUserPasswordEmail);
userRouter.post("/resetpassword/:id/:token", userController.resetpassword)
userRouter.post("/login", logInUserValidation, userController.userLogin)

module.exports = userRouter
