import User from "../../models/user/userModel.js";
import CustomErrorHandler from "../../Services/errorHandler/customErrorHandler.js";
import Hashing from "../../services/passowrd/Hashing.js";
import userValidation from "../../utils/validation/authValidation.js";

const registerController = {
    /*
       @Desc     REGISTER NEW USER
       @Route    POST /auth/register
       @Access   public 
   */
    async registerUser(req, res,next) {
        try {
            //client request validation
            const { error } = userValidation.register.validate(req.body);
            if (error) {  
                return next(error)
            }

            const { name, email, countryCode, phoneNumber, password } = req.body
            let userExist
            try {
                //check if user already exist with specified Mobile Number
                userExist = await User.findOne({ $and: [{ "phone.number": phoneNumber }, { "phone.countryCode": countryCode }] });
            } catch (error) {
                return next(error)
            }
            if (userExist) return next(CustomErrorHandler.errResponse(200, "User already exist with specified Mobile Number"));
            try {
                //check if user already exist with specified Email Id
                userExist = await User.findOne({ "email": email });
            } catch (error) {
                return next(error)
            }
            if (userExist) return next(CustomErrorHandler.errResponse(200, "User already exist with specified Email Id"));

            let hashedPassword;
            try {
                hashedPassword = await Hashing.hashing(password);
            } catch (error) {
                return next(error);
            }

            const newUser = new User({ name, email,  phone: { countryCode, number: phoneNumber }, password: hashedPassword });
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "User created successfully",
            })

        } catch (error) {
            return next(error)
        }

    }
}

export default registerController