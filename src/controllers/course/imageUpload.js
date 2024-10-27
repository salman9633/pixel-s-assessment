import CustomErrorHandler from "../../services/errorHandler/customErrorHandler.js";
import { uploadImagetoCloudinary } from "../../services/imageUpload/cloudinaryService.js";

const courseImageController = {
    /*
           @Desc     UPLOAD IMAGE TO CLOUDINARY 
           @Route    POST /course/upload-course-image
           @Access   private 
   */
    async uploadImage(req, res, next) {
        try {


            if (!req.file) return next(CustomErrorHandler.errResponse(422, 'Please upload a file'));
            console.log(req.file);

            let imaageURL = await uploadImagetoCloudinary(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`);

            res.cookie('courseImage', imaageURL, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
            // console.log({cook:req.cookies.courseImage});

            return res.status(200).json({
                success: true,
                message: 'Image uploaded successfully'
            });

        } catch (error) {
            return next(error)
        }
    }
}

export default courseImageController