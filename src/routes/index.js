import express from "express";
import auth from '../routes/auth/authRoutes.js'
import course from '../routes/course/courseRoutes.js'
const router = express.Router()

router.use('/auth',auth);
router.use('/course',course);

export default router
