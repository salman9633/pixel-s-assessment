import Course from "../../models/course/courseModel.js";
import Schedule from "../../models/schedule/scheduleModel.js";
import CustomErrorHandler from "../../services/errorHandler/customErrorHandler.js";
import idValidator from "../../utils/idValidator/mongoDBIdValidator.js";
import scheduleValidation from "../../utils/validation/scheduleValidation.js";

const sheduleController = {
    /*
        @Desc     ADD SCHEDULES FOR THE COURSE 
        @Route    POST /course/add-schedule/:courseId
        @Access   private 
    */
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
    },

    /*
       @Desc     GET SCHEDULE DETAILS 
       @Route    GET /course/get-schedule-deatils?scheduleId
       @Access   private 
   */
    async getSheduleDetails(req, res, next) {
        try {
            const { scheduleId } = req.query;

            try {
                idValidator.checking({ scheduleId });
            } catch (error) {
                return next(CustomErrorHandler.errResponse(203, error.message))
            }

            let schedule = await Schedule.findOne({ _id: scheduleId });
            if (!schedule) return next(CustomErrorHandler.errResponse(200, 'Schedule not found'));

            return res.status(200).json({
                success: true,
                message: 'Schedule found successfully',
                data: schedule
            })
        } catch (error) {
            return next(error)
        }
    },


    /*
      @Desc     UPDATE SESSION OF SCHEDULE 
      @Route    PUT /course/update-schedule-session?scheduleId
      @Access   private 
  */

    async updateSchedulesForCourse(req, res, next) {

        const { error } = scheduleValidation.updateSchedule.validate(req.body)
        if (error) {
            return next(error);
        }
        const { scheduleId } = req.query;

        try {
            idValidator.checking({ scheduleId });
        } catch (error) {
            return next(CustomErrorHandler.errResponse(203, error.message))
        }

        let schedule = await Schedule.findOne({ _id: scheduleId });
        if (!schedule) return next(CustomErrorHandler.errResponse(200, 'Schedule not found'));

        const { day, isActive, from, to, trainers, room, link } = req.body

        let session = schedule.weekdays.filter((ele) => ele.day == day)

        if (session.length == 0) {
            schedule.weekdays.push({
                day,
                isActive,
                session: [{
                    from,
                    to,
                    trainers,
                    room,
                    link
                }]
            })
        } else {
            session[0].isActive = isActive
            session[0].session[0].from = from
            session[0].session[0].to = to
            session[0].session[0].trainers = trainers
            session[0].session[0].room = room
            session[0].session[0].link = link
        }

        await schedule.save();
        return res.status(200).json({
            success: true,
            message: 'Session updated successfully'
        })
    },

    /*
          @Desc     ACTIVATE AND DEACTIVATE SESSIONS 
          @Route    PUT /course/active-session?scheduleId&day
          @Access   private 
    */
    async activeteSession(req, res, next) {
        const { error } = scheduleValidation.activateSession.validate(req.query)
        if (error) {
            return next(error);
        }
        const { scheduleId, day } = req.query;

        try {
            idValidator.checking({ scheduleId });
        } catch (error) {
            return next(CustomErrorHandler.errResponse(203, error.message))
        }

        let schedule = await Schedule.findOne({ _id: scheduleId });
        if (!schedule) return next(CustomErrorHandler.errResponse(200, 'Schedule not found'));

        let session = schedule.weekdays.filter((ele) => ele.day == day)

        if (session.length == 0) return next(CustomErrorHandler.errResponse(200, `${day} has no session registered`));
        session[0].isActive = !session[0].isActive

        await schedule.save();
        return res.status(200).json({
            success: true,
            message: `Session ${session[0].isActive == true ? 'activated' : 'deactivated'} successfully`
        })
    }
}

export default sheduleController