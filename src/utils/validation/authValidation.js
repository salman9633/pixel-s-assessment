import Joi from "joi";

const userValidation = {
    //register validation
    register: Joi.object({
        name: Joi.string().min(2).regex(/^[a-zA-Z]+$/).required().messages({
            "string.empty": "Please enter the  Name",
            "string.min": "Enter Valid Name",
            "any.required": "Name is required",
            "string.pattern.base": "Only characters is allowed in  name",
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "Please enter the Email",
            "string.email": "email must be a valid email",
            "any.required": "email is required",
        }),
        countryCode: Joi.string().regex(/^\+\d{1,3}$/).required().messages({
            "string.empty": "Please enter the country Code",
            "string.pattern.base": "countryCode must be a valid country code",
            "any.required": "country code is required",
        }),
        phoneNumber: Joi.string().min(10).regex(/^\d+$/).max(10).required().messages({
            "string.empty": "Please enter the Phone Number",
            "string.min": "Enter Valid phone number",
            "string.max": "Enter Valid phone number",
            "string.pattern.base": "phone number must be a valid phone number",
            "any.required": "phone number is required",
        }),
        password: Joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/).required().messages({
            "string.empty": "Please enter the Password",
            "string.min": "Enter Valid Password with minimum 8 length",
            "string.pattern.base": "Password must contain a special character a upper case letter a lower case letter and a digit",
            "any.required": "Password is required",
        }),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.only": "password and confirmPassword didn't Matched",
            "any.required": "Confirm Password is required",
            "string.empty": "Please enter the Confirm Password",
        })
    }),

    //login validation
    login: Joi.object({
        countryCode: Joi.string().regex(/^\+\d{1,3}$/).required().messages({
            "string.empty": "country code is required",
            "string.pattern.base": "countryCode must be a valid country code",
            "any.required": "Country Code Is Required"

        }),
        phoneNumber: Joi.string().min(10).regex(/^\d+$/).max(10).required().messages({
            "string.empty": "phone number is required",
            "string.min": "Enter Valid phone number",
            "string.max": "Enter Valid phone number",
            "string.pattern.base": "phone number must be a valid phone number",
            "any.required": "phone number Is Required"

        }),
        password: Joi.string().required().messages({
            "string.empty": "Please enter the Password",
            "any.required": "Password is required",
        }),
    })

}

export default userValidation