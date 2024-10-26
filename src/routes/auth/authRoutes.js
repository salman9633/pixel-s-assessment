import express from "express";
import loigController from "../../controllers/authentication/loginController";
import registerController from "../../controllers/authentication/registerController";
const router = express.Router()

router.post('/login',loigController.login );
router.post('/register',registerController.registerUser );

export default router