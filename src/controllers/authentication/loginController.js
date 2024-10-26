import { ACCESS_SECRET } from "../../configs/envConfig.js";
import User from "../../models/user/userModel.js";
import CustomErrorHandler from "../../Services/errorHandler/customErrorHandler.js";
import JwtService from "../../services/jwt/Jwt.js";
import Hashing from "../../services/passowrd/Hashing.js";
import userValidation from "../../utils/validation/authValidation.js";

const loigController = {
    /*
        @Desc     LOGIN USER WITH MOBILE NUMBER
        @Route    POST /usersAuth/login-using-phone
        @Access   public 
    */
    async login(req, res, next) {
        try {
            //client request validation
            const { error } = userValidation.login.validate(req.body);
            if (error) {
                return next(error)
            }

            const { countryCode, phoneNumber, password } = req.body
            let userExist
            try {
                //check if user already exist with specified Mobile Number
                userExist = await User.findOne({ $and: [{ "phone.number": phoneNumber }, { "phone.countryCode": countryCode }] });
            } catch (error) {
                return next(error)
            }
            if (!userExist) return next(CustomErrorHandler.errResponse(200, "Invalid Credentials"));

            // Comparing Password
            const comparePass = await Hashing.compare(password, userExist.password);

            // If password not matched
            if (!comparePass) return next(CustomErrorHandler.errResponse(200, "Invalid Credentials"));

            const accessToken = await JwtService.sign({ _id: userExist._id, email: userExist.email, phone: userExist.phone }, ACCESS_SECRET, '24h');

            return res.status(201).json({
                success: true,
                message: `${userExist.name} LoggedIn SuccessFully`,
                data: {
                    _id: userExist._id,
                    name: userExist.name,
                    userName: userExist.userName,
                    email: userExist.email,
                    phone: userExist.phone,
                },
                token: accessToken
            });

        } catch (error) {
            return next(error)
        }

    }
}

export default loigController