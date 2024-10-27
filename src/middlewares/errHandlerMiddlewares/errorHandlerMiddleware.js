import pkg from 'joi';
const { ValidationError } = pkg;
import CustomErrorHandler from "../../services/errorHandler/customErrorHandler.js";

const errorHandler = async (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: "Internal Server Error",
        success:false
    }


    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        data.error = 'Bad JSON syntax',
            statusCode = 400
    }
    
    if (err instanceof ValidationError) {
        
        statusCode = 422;

        let errObj = {

        };
        let message;
        err.details.forEach((error) => {
            errObj[error.path] = error.message
            message = error.message

        })

        data = {
            message,
            errors: errObj,
            success:false
        }
        
    }

    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data.message = err.message;
        data.success = false
    }

    return res.status(statusCode).json(data);
}

export default errorHandler; 