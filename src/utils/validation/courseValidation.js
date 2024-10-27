import Joi from "joi";

const courseValidation = {
    //course validation
    course: Joi.object({
        name: Joi.string().min(2).required().messages({
            "string.empty": "Please enter the course name",
            "string.min": "Enter Valid course name",
            "any.required": "Name is required",
            // "string.pattern.base": "Only characters is allowed for course name",
        }),
        category: Joi.string().valid('Student', 'Teacher').required().messages({
            "any.only": "Invalid category Value",
            "string.empty": "Please enter the course category",
            "string.min": "Enter Valid course category",
        }),
        branch: Joi.string().min(2).regex(/^[a-zA-Z]+$/).required().messages({
            "string.empty": "Please enter the branch",
            "string.min": "Enter Valid a branch name",
            "any.required": "branch is required",
            "string.pattern.base": "Only characters is allowed for branch name",
        }),
        memberRegistationLimit: Joi.number().required().messages({
            "number.empty": "Please provide the member Registation Limit.",
            "number.base": "member Registation Limit must be a number.",
            "any.required": "memberRegistationLimit is required",
        }),
        mode: Joi.string().valid('Online', 'Offline').required().messages({
            "any.only": "Corse Mode must be Online or Offline",
            "string.empty": "Please enter the course Mode",
            "string.base": "Enter Valid course Mode",
        }),
        level: Joi.string().optional().valid("Beginner", "Intermediate", "Expert").messages({
            "any.only": "Corse Mode must be Online or Offline",
            "string.base": "Please enter the course Mode",
        }),
        calorieBurned: Joi.object({
            value: Joi.number().positive().optional().messages({
                "number.empty": "Please provide the calorie Burned.",
                "number.positive": "Price must be a positive number",
                "number.base": "calorie Burned must be a number.",
                "any.required": "calorie Burned is required",
            }),
            unit: Joi.string().valid('Kcal', 'Kg').optional().messages({
                "any.only": "calorie BurnedUnit must be Kcal or Kg",
                "string.empty": "Please enter the calorie Burned Unit",
                "string.base": "Enter Valid calorie Burned Unit",
            }),
        }).optional().messages({
            "object.base": "calorieBurned must be an object."
        }),
        benefitOfTheCourse: Joi.array().items(Joi.string().messages({
            "string.base": "Each benefitOfTheCourse must be a string.",
            "string.empty": "benefitOfTheCourse cannot be empty."
        })).optional().messages({
            "array.base": "benefit Of Th eCourse must be an array.",
            "array.includes": "benefit OfThe Course only contain strings."
        }),
        bringYourOwnKit: Joi.array().items(Joi.string().messages({
            "string.base": "Each bringYourOwnKit must be a string.",
            "string.empty": "bringYourOwnKit cannot be empty."
        })).optional().messages({
            "array.base": "bringYourOwnKit must be an array.",
            "array.includes": "bringYourOwnKit only contain strings."
        }),
        description: Joi.string().optional().messages({
            "string.base": "description must be a string.",
            "string.empty": "description cannot be empty."
        }),
        isPrivate: Joi.boolean().required().messages({
            "boolean.base": "private must be a boolean.",
            "any.required": "private is required",
        })


    }),

    pricing: Joi.array().items(
        Joi.object({
            title: Joi.string().required().messages({
                "string.base": "Title must be a string",
                "string.empty": "Title is required",
                "any.required": "Title is a required field",
            }),
            price: Joi.number().positive().required().messages({
                "number.base": "Price must be a number",
                "number.positive": "Price must be a positive number",
                "any.required": "Price is a required field",
            }),
            currency: Joi.string().valid("INR").required().messages({
                "string.base": "Currency must be a string",
                "any.only": "Currency must be 'INR'",
                "any.required": "Currency is a required field",
            }),
            taxRate: Joi.number().min(0).max(100).required().messages({
                "number.base": "Tax rate must be a number",
                "number.min": "Tax rate cannot be less than 0",
                "number.max": "Tax rate cannot be more than 100",
                "any.required": "Tax rate is a required field",
            })
        })
    ).min(1).required().messages({
        "array.base": "The request body must be an array of items",
        "array.min": "The pricing array must contain at least one item",
        "any.required": "The request body is required and must be an array of items"
    }),

    advancedOptions: Joi.object({
        allowInstallments: Joi.boolean().required().messages({
            "boolean.base": "Allow installments must be a boolean value",
            "any.required": "Allow installments is a required field"
        }),
        allowJoiningAnytime: Joi.boolean().required().messages({
            "boolean.base": "Allow joining anytime must be a boolean value",
            "any.required": "Allow joining anytime is a required field"
        }),
        autoConfirmWaitlist: Joi.boolean().required().messages({
            "boolean.base": "Auto confirm waitlist must be a boolean value",
            "any.required": "Auto confirm waitlist is a required field"
        }),
        registrationStartDate: Joi.string().custom((value, helpers) => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                return helpers.error('string.base', { message: 'Registration start date must be a valid date in MM/DD/YYYY format' });
            }
            return value; // If valid, return the value
        }).optional().messages({
            "string.base": "Registration start date must be a string",
            "string.empty": "Registration start date must be a string",
        }),
        bookingDeadline: Joi.object({
            value: Joi.number().integer().optional().messages({
                "number.base": "Booking deadline value must be a number"
            }),
            unit: Joi.string().valid("Hours", "Days", "Weeks", "Months").optional().messages({
                "string.base": "Booking deadline unit must be a string",
                "string.empty": "Booking deadline unit must be a string",
                "any.only": "Booking deadline unit must be one of 'Hours', 'Days', 'Weeks', 'Months'"
            })
        }).optional().messages({
            "object.base": "Booking deadline must be an object"
        }),
        reminderBeforeCourse: Joi.object({
            value: Joi.number().integer().optional().messages({
                "number.base": "Reminder value must be a number"
            }),
            unit: Joi.string().valid("Hours", "Days", "Weeks", "Months").optional().messages({
                "string.base": "Reminder unit must be a string",
                "string.empty": "Reminder unit must be a string",
                "any.only": "Reminder unit must be one of 'Hours', 'Days', 'Weeks', 'Months'"
            })
        }).optional().messages({
            "object.base": "Reminder before course must be an object"
        }),
        cancellationPeriod: Joi.object({
            value: Joi.number().integer().optional().messages({
                "number.base": "Cancellation period value must be a number"
            }),
            unit: Joi.string().valid("Hours", "Days", "Weeks", "Months").optional().messages({
                "string.base": "Cancellation period unit must be a string",
                "string.empty": "Cancellation period unit must be a string",
                "any.only": "Cancellation period unit must be one of 'Hours', 'Days', 'Weeks', 'Months'"
            })
        }).optional().messages({
            "object.base": "Cancellation period must be an object"
        }),
        unPaidBookingCancellation: Joi.object({
            value: Joi.number().integer().optional().messages({
                "number.base": "Unpaid booking cancellation value must be a number"
            }),
            unit: Joi.string().valid("Hours", "Days", "Weeks", "Months").optional().messages({
                "string.base": "Unpaid booking cancellation unit must be a string",
                "string.empty": "Unpaid booking cancellation unit must be a string",
                "any.only": "Unpaid booking cancellation unit must be one of 'Hours', 'Days', 'Weeks', 'Months'"
            })
        }).optional().messages({
            "object.base": "Unpaid booking cancellation must be an object"
        }),
        allowWaitlistBooking: Joi.number().integer().optional().messages({
            "number.base": "Allow waitlist booking value must be a number"
        }),
        bookingForFriends: Joi.number().integer().optional().messages({
            "number.base": "Booking for friends value must be a number"
        }),
        ageRestriction: Joi.object({
            minAge: Joi.number().integer().optional().messages({
                "number.base": "Minimum age must be a number"
            }),
            maxAge: Joi.number().integer().optional().messages({
                "number.base": "Maximum age must be a number"
            })
        }).optional().messages({
            "object.base": "Age restriction must be an object"
        }),
        genderRestriction: Joi.string().valid("Male", "Female", "Others").optional().messages({
            "string.base": "Gender restriction must be a string",
            "any.only": "Gender restriction must be one of 'Male', 'Female', 'Others'"
        })
    })

}

export default courseValidation