import courseValidation from "../../utils/validation/courseValidation"

const courseController = {
    addAnewCourse(req, res, next) {
        try {
            const { error } = courseValidation.course.validate(req.body)
            if (error) {
                return next(error)
            }

        } catch (error) {
            return next(error)
        }
     }
}

export default courseController