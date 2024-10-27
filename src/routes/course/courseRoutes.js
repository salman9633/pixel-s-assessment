import express from "express";
import courseImageController from "../../controllers/course/imageUpload.js";
import proctected from "../../middlewares/authMiddlewares/userAuthMiddleware.js";
import { upload } from "../../middlewares/fileUploadMiddleware/multerMiddleware.js";
import courseController from "../../controllers/course/courseController.js";
import sheduleController from "../../controllers/course/sheduleController.js";
const router = express.Router()

//course related routes
router.post('/upload-course-image', proctected, upload.single('image'), courseImageController.uploadImage);
router.post('/add-new-course', proctected, courseController.addAnewCourse);
router.post('/add-pricing/:courseId', proctected, courseController.addPricingToCourse);
router.post('/add-advanced-option/:courseId', proctected, courseController.addAdvancedOptions);
router.get('/get-course-deatils/:courseId', proctected, courseController.fetchCourseDetails);

//Schedule related routes
router.post('/add-schedule/:courseId', proctected, sheduleController.addSchedulesForCourse);


export default router