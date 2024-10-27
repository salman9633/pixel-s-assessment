
import courseValidation from "../../utils/validation/courseValidation.js"
import Course from "../../models/course/courseModel.js"
import CustomErrorHandler from "../../services/errorHandler/customErrorHandler.js"
import idValidator from "../../utils/idValidator/mongoDBIdValidator.js"

const courseController = {
    /*
        @Desc     ADD A NEW COURSE 
        @Route    POST /course/add-new-course
        @Access   private 
    */
    async addAnewCourse(req, res, next) {
        try {
            const { error } = courseValidation.course.validate(req.body)
            if (error) {
                return next(error)
            }

            let { name, category, branch, memberRegistationLimit, mode, isPrivate } = req.body
            const { userId } = req.user

            let course = await Course.findOne({ $and: [{ userId }, { name }] })

            if (course) return next(CustomErrorHandler.errResponse(200, `Course already exist with ${name} name.`));

            //seting required one
            let newCourse = new Course({
                name,
                userId,
                category,
                branch,
                memberRegistationLimit,
                mode,
                isPrivate
            })

            //setting optional one
            if (req.cookies.courseImage) newCourse.image = req.cookies.courseImage.url;
            if (req.body.calorieBurned) {
                newCourse.calorieBurned.value = req.body.calorieBurned.value
                newCourse.calorieBurned.unit = req.body.calorieBurned.unit
            }
            if (req.body.description) newCourse.description = req.body.description
            if (req.body.benefitOfTheCourse) newCourse.benefitOfTheCourse = req.body.benefitOfTheCourse
            if (req.body.bringYourOwnKit) newCourse.bringYourOwnKit = req.body.bringYourOwnKit


            await newCourse.save();
            res.clearCookie('courseImage');
            return res.status(200).json({
                success: true,
                message: 'Course added successfully',
                data: {
                    courseId: newCourse._id,
                    courseName: newCourse.name
                }
            })
            // if(req.cookies.courseImage)
        } catch (error) {
            return next(error)
        }
    },
    /*
        @Desc     ADD PRICING TO THE COURSE 
        @Route    POST /course/add-pricing/:courseId
        @Access   private 
    */
    async addPricingToCourse(req, res, next) {

        try {
            const { error } = courseValidation.pricing.validate(req.body)
            if (error) {
                return next(error)
            }

            const { userId } = req.user
            const { courseId } = req.params;

            try {
                idValidator.checking({ userId, courseId });
            } catch (error) {
                return next(CustomErrorHandler.errResponse(203, error.message))
            }
            let course = await Course.findOne({ $and: [{ userId }, { _id: courseId }] })

            if (!course) return next(CustomErrorHandler.errResponse(200, 'Course not found'));

            req.body.forEach(element => {
                course.price.push(element);
            });

            await course.save();

            return res.status(200).json({
                success: true,
                message: 'Pricing added successfully',
                data: {
                    courseId: course._id,
                    courseName: course.name
                }
            })
        } catch (error) {
            return next(error)
        }
    },

    /*
        @Desc     ADD ADVANCED OPTIONS TO THE COURSE 
        @Route    POST /course/add-advanced-option/:courseId
        @Access   private 
    */
    async addAdvancedOptions(req, res, next) {
        try {
            const { error } = courseValidation.advancedOptions.validate(req.body)
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

            let course = await Course.findOne({ $and: [{ userId }, { _id: courseId }] });
            if (!course) return next(CustomErrorHandler.errResponse(200, 'Course not found'));

            const { allowInstallments, allowJoiningAnytime, autoConfirmWaitlist } = req.body
            course.moduleOptions.allowInstallments = allowInstallments
            course.moduleOptions.allowJoiningAnytime = allowJoiningAnytime
            course.moduleOptions.autoConfirmWaitlist = autoConfirmWaitlist

            if (req.body.registrationStartDate) {
                course.registrationStartDate.isActive = true
                course.registrationStartDate.value = req.body.registrationStartDate
            }
            if (req.body.bookingDeadline) {
                course.bookingDeadline.isActive = true
                course.bookingDeadline.value = req.body.bookingDeadline.value
                course.bookingDeadline.unit = req.body.bookingDeadline.unit
            }
            if (req.body.reminderBeforeCourse) {
                course.reminderBeforeCourse.isActive = true
                course.reminderBeforeCourse.value = req.body.reminderBeforeCourse.value
                course.reminderBeforeCourse.unit = req.body.reminderBeforeCourse.unit
            }
            if (req.body.cancellationPeriod) {
                course.cancellationPeriod.isActive = true
                course.cancellationPeriod.value = req.body.cancellationPeriod.value
                course.cancellationPeriod.unit = req.body.cancellationPeriod.unit
            }
            if (req.body.unPaidBookingCancellation) {
                course.unPaidBookingCancellation.isActive = true
                course.unPaidBookingCancellation.value = req.body.unPaidBookingCancellation.value
                course.unPaidBookingCancellation.unit = req.body.unPaidBookingCancellation.unit
            }
            if (req.body.allowWaitlistBooking) {
                course.allowWaitlistBooking.isActive = true
                course.allowWaitlistBooking.value = req.body.allowWaitlistBooking
            }
            if (req.body.bookingForFriends) {
                course.bookingForFriends.isActive = true
                course.bookingForFriends.value = req.body.bookingForFriends
            }
            if (req.body.ageRestriction) {
                course.ageRestriction.isActive = true
                course.ageRestriction.minAge = req.body.ageRestriction.minAge
                course.ageRestriction.maxAge = req.body.ageRestriction.maxAge
            }
            if (req.body.genderRestriction) {
                course.genderRestriction.isActive = true
                course.genderRestriction.gender = req.body.genderRestriction
            }

            await course.save();

            return res.status(200).json({
                success: true,
                message: 'Advanced options added successfully',
                data: course
            });

        } catch (error) {
            return next(error);
        }

    }

}

export default courseController