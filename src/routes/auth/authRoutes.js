import express from "express";
import loigController from "../../controllers/authentication/loginController.js";
import registerController from "../../controllers/authentication/registerController.js";
const router = express.Router()

router.post('/login',loigController.login );
router.post('/register',registerController.registerUser );

export default router