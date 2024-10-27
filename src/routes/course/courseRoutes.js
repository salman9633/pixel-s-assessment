import express from "express";
import courseImageController from "../../controllers/course/imageUpload.js";
import proctected from "../../middlewares/authMiddlewares/userAuthMiddleware.js";
import { upload } from "../../middlewares/fileUploadMiddleware/multerMiddleware.js";
import courseController from "../../controllers/course/courseController.js";
const router = express.Router()

router.post('/upload-course-image', proctected, upload.single('image'), courseImageController.uploadImage);
router.post('/add-new-course', proctected, courseController.addAnewCourse);
router.post('/add-pricing/:courseId', proctected, courseController.addPricingToCourse);
router.post('/add-advanced-option/:courseId', proctected, courseController.addAdvancedOptions);


export default router