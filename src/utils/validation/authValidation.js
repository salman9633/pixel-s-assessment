import Joi from "joi";

const userValidation = {
    //register validation
    register: Joi.object({}),

    //login validation
    login:Joi.object({})

}

export default userValidation