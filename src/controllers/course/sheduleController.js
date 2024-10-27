import Course from "../../models/course/courseModel.js";
import Schedule from "../../models/schedule/scheduleModel.js";
import CustomErrorHandler from "../../services/errorHandler/customErrorHandler.js";
import idValidator from "../../utils/idValidator/mongoDBIdValidator.js";
import scheduleValidation from "../../utils/validation/scheduleValidation.js";

const sheduleController = {
    async addSchedulesForCourse(req, res, next) {
        try {
            const { error } = scheduleValidation.addSchedule.validate(req.body)
            if (error) {
                return next(error);
            }

            const { userId } = req.user;
            const { courseId } = req.params;

            try {
                idValidator.checking({ userId, courseId });
            } catch (error) {
                return next(CustomErrorHandler.errResponse(203, error.message))
            }

            let schedule = await Schedule.findOne({ courseId });
            if (schedule) return next(CustomErrorHandler.errResponse(200, 'Schedule already exist for this course'));

            const { startDate, endDate, weekdays } = req.body



            let newSchedule = new Schedule({
                startDate,
                endDate,
                courseId,
                weekdays
            })



            await newSchedule.save()

            //saving shedule id in course for easy retrival
            await Course.updateOne({ _id: courseId }, {
                scheduleId: newSchedule._id
            });

            return res.status(200).json({
                success: true,
                message: 'Schedule added successfully',
                data: newSchedule
            })

        } catch (error) {
            return next(error)
        }
    }
}

export default sheduleController