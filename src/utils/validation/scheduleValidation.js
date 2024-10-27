import Joi from "joi"

const scheduleValidation = {
    addSchedule: Joi.object({

        startDate: Joi.date().required().messages({
            "date.base": "Start date must be a valid date",
            "any.required": "Start date is required"
        }),
        endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
            "date.base": "End date must be a valid date",
            "date.greater": "End date must be greater than start date",
            "any.required": "End date is required"
        }),
        weekdays: Joi.array().items(Joi.object({
            day: Joi.string().valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday").required().messages({
                "string.base": "Day must be a string",
                "string.empty": "Day must be a string",
                "any.only": "Day must be one of 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'",
                "any.required": "Day is required"
            }),
            isActive: Joi.boolean().default(false).required().messages({
                "boolean.base": "Is Active must be a boolean value",
                "any.required": "Is Active is a required field"
            }),
            session: Joi.array().items(Joi.object({
                from: Joi.object({
                    hour: Joi.number().integer().min(0).max(12).required().messages({
                        "number.base": "From hour must be a number",
                        "number.min": "From hour must be at least 0",
                        "number.max": "From hour cannot be more than 12",
                        "any.required": "From hour is required"
                    }),
                    minute: Joi.number().integer().min(0).max(59).required().messages({
                        "number.base": "From minute must be a number",
                        "number.min": "From minute must be at least 0",
                        "number.max": "From minute cannot be more than 59",
                        "any.required": "From minute is required"
                    }),
                    timeSpace: Joi.string().valid("AM", "PM").required().messages({
                        "string.base": "From time space must be a string",
                        "any.only": "From time space must be either 'AM' or 'PM'",
                        "any.required": "From time space is required"
                    })
                }).required().messages({
                    "object.base": "From time must be an object",
                    "any.required": "From time is required"
                }),
                to: Joi.object({
                    hour: Joi.number().integer().min(0).max(12).required().messages({
                        "number.base": "To hour must be a number",
                        "number.min": "To hour must be at least 0",
                        "number.max": "To hour cannot be more than 12",
                        "any.required": "To hour is required"
                    }),
                    minute: Joi.number().integer().min(0).max(59).required().messages({
                        "number.base": "To minute must be a number",
                        "number.min": "To minute must be at least 0",
                        "number.max": "To minute cannot be more than 59",
                        "any.required": "To minute is required"
                    }),
                    timeSpace: Joi.string().valid("AM", "PM").required().messages({
                        "string.base": "To time space must be a string",
                        "any.only": "To time space must be either 'AM' or 'PM'",
                        "any.required": "To time space is required"
                    })
                }).required().messages({
                    "object.base": "To time must be an object",
                    "any.required": "To time is required"
                }),
                trainers: Joi.array().items(Joi.string()).optional().messages({
                    "array.base": "Trainers must be an array of strings"
                }),
                room: Joi.string().required().messages({
                    "string.base": "Room must be a string",
                    "any.required": "Room is required"
                }),
                link: Joi.string().uri().required().messages({
                    "string.base": "Link must be a string",
                    "string.uri": "Link must be a valid URI",
                    "any.required": "Link is required"
                })
            })).required().min(1).messages({
                "array.base": "Session must be an array of session objects",
                "array.min": "session atleast have one session deatils object",
            })
        })).required().min(1).messages({
            "array.base": "Weekdays must be an array of weekday objects",
            "any.required": "Weekdays is required and must be an array of weekday objects",
            "array.min": "Weekdays atleast have one weekday object",
        })
    }).custom((value, helpers) => {
        for (const weekday of value.weekdays) {
            for (const session of weekday.session) {
                const fromHour = session.from.hour + (session.from.timeSpace === "PM" && session.from.hour !== 12 ? 12 : 0);
                const fromMinutes = session.from.minute;
                const totalFromMinutes = fromHour * 60 + fromMinutes;

                const toHour = session.to.hour + (session.to.timeSpace === "PM" && session.to.hour !== 12 ? 12 : 0);
                const toMinutes = session.to.minute;
                const totalToMinutes = toHour * 60 + toMinutes;

                if (totalFromMinutes >= totalToMinutes) {
                    return helpers.error('any.invalid', { message: "The 'from' time must be less than the 'to' time" });
                }
            }
        }
        return value; // If valid, return the value
    }).messages({
        "any.invalid": "The 'from' time must be less than the 'to' time",
    }),

    activateSession: Joi.object({
        day: Joi.string().valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday").required().messages({
            "string.base": "Day must be a string",
            "string.empty": "Day must be a string",
            "any.only": "Day must be one of 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'",
            "any.required": "Day is required"
        }),
        scheduleId: Joi.string().required().messages({
            "string.base": "schedule Id must be a string",
            "any.required": "schedule Id is required"
        })
    }),

    updateSchedule: Joi.object({
        day: Joi.string()
            .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
            .required()
            .messages({
                "string.base": "Day must be a string",
                "any.only": "Day must be a valid weekday",
                "string.empty": "Day must be a string",
                "any.required": "Day is required"
            }),
        isActive: Joi.boolean()
            .required()
            .messages({
                "boolean.base": "Is Active must be a boolean value",
                "any.required": "Is Active is required"
            }),
        from: Joi.object({
            hour: Joi.number().integer().min(0).max(12).required().messages({
                "number.base": "From hour must be a number",
                "number.min": "From hour must be at least 0",
                "number.max": "From hour cannot be more than 12",
                "any.required": "From hour is required"
            }),
            minute: Joi.number().integer().min(0).max(59).required().messages({
                "number.base": "From minute must be a number",
                "number.min": "From minute must be at least 0",
                "number.max": "From minute cannot be more than 59",
                "any.required": "From minute is required"
            }),
            timeSpace: Joi.string().valid("AM", "PM").required().messages({
                "string.base": "From time space must be a string",
                "any.only": "From time space must be either 'AM' or 'PM'",
                "any.required": "From time space is required"
            })
        }).required().messages({
            "object.base": "From time must be an object",
            "any.required": "From time is required"
        }),
        to: Joi.object({
            hour: Joi.number().integer().min(0).max(12).required().messages({
                "number.base": "To hour must be a number",
                "number.min": "To hour must be at least 0",
                "number.max": "To hour cannot be more than 12",
                "any.required": "To hour is required"
            }),
            minute: Joi.number().integer().min(0).max(59).required().messages({
                "number.base": "To minute must be a number",
                "number.min": "To minute must be at least 0",
                "number.max": "To minute cannot be more than 59",
                "any.required": "To minute is required"
            }),
            timeSpace: Joi.string().valid("AM", "PM").required().messages({
                "string.base": "To time space must be a string",
                "any.only": "To time space must be either 'AM' or 'PM'",
               " string.empty": "To time space must be a string",
                "any.required": "To time space is required"
            })
        }).required().messages({
            "object.base": "To time must be an object",
            "any.required": "To time is required"
        }),
        trainers: Joi.array().items(Joi.string()).required().messages({
            "array.base": "Trainers must be an array of strings",
            "any.required": "Trainers is required"
        }),
        room: Joi.string().required().messages({
            "string.base": "Room must be a string",
            "any.required": "Room is required",
            "string.empty": "Room must be a string"
        }),
        link: Joi.string().uri().required().messages({
            "string.base": "Link must be a string",
            "string.uri": "Link must be a valid URI",
            "string.empty": "Link must be a string",
            "any.required": "Link is required"
        })
    }).custom((value, helpers) => {
        // Convert from time and to time to minutes
        const fromHour = value.from.hour + (value.from.timeSpace === "PM" && value.from.hour !== 12 ? 12 : 0);
        const fromMinutes = value.from.minute;
        const totalFromMinutes = fromHour * 60 + fromMinutes;
    
        const toHour = value.to.hour + (value.to.timeSpace === "PM" && value.to.hour !== 12 ? 12 : 0);
        const toMinutes = value.to.minute;
        const totalToMinutes = toHour * 60 + toMinutes;
    
        if (totalFromMinutes >= totalToMinutes) {
            return helpers.error('any.invalid', { message: "The 'from' time must be earlier than the 'to' time" });
        }
    
        return value; // If valid, return the value
    }).messages({
        "any.invalid": "The 'from' time must be earlier than the 'to' time"
    })
}

export default scheduleValidation