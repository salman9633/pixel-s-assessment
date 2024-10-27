import express from "express";
import loigController from "../../controllers/authentication/loginController.js";
import registerController from "../../controllers/authentication/registerController.js";
import { limiter } from "../../middlewares/rateLimiter/rateLimitedMiddleware.js";
const router = express.Router()

router.post('/login', limiter, loigController.login);
router.post('/register', limiter, registerController.registerUser);

export default router