import express from "express";
import courseImageController from "../../controllers/course/imageUpload.js";
import proctected from "../../middlewares/authMiddlewares/userAuthMiddleware.js";
import { upload } from "../../middlewares/fileUploadMiddleware/multerMiddleware.js";
import courseController from "../../controllers/course/courseController.js";
import sheduleController from "../../controllers/course/sheduleController.js";
import { limiter } from "../../middlewares/rateLimiter/rateLimitedMiddleware.js";
const router = express.Router()

//course related routes
router.post('/upload-course-image', limiter, proctected, upload.single('image'), courseImageController.uploadImage);
router.post('/add-new-course', limiter, proctected, courseController.addAnewCourse);
router.post('/add-pricing/:courseId', limiter, proctected, courseController.addPricingToCourse);
router.post('/add-advanced-option/:courseId', limiter, proctected, courseController.addAdvancedOptions);
router.get('/get-course-deatils/:courseId', limiter, proctected, courseController.fetchCourseDetails);

//Schedule related routes
router.post('/add-schedule/:courseId', limiter, proctected, sheduleController.addSchedulesForCourse);
router.get('/get-schedule-deatils', limiter, proctected, sheduleController.getSheduleDetails);
router.put('/update-schedule-session', limiter, proctected, sheduleController.updateSchedulesForCourse);
router.put('/active-sessions', limiter, proctected, sheduleController.activeteSession);


export default router