import mongoose from "mongoose"
import courseValidation from "../../utils/validation/courseValidation.js"
import Course from "../../models/course/courseModel.js"
import CustomErrorHandler from "../../services/errorHandler/customErrorHandler.js"

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

    async addPricingToCourse(req, res, next) {

        try {
            const { error } = courseValidation.pricing.validate(req.body)
            if (error) {
                return next(error)
            }

            const { userId } = req.user

            let course = await Course.findOne({ $and: [{ userId }, { _id: req.params.courseId }] })

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


    }
}

export default courseController