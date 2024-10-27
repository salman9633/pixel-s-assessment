import mongoose from "mongoose";


export const weekdaysSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    session: [
        {
            from: {
                hour: Number,
                minute: Number,
                timeSpace: {
                    type: String,
                    enum: ["AM", "PM"],
                    required: true
                }
            },
            to: {
                hour: Number,
                minute: Number,
                timeSpace: {
                    type: String,
                    enum: ["AM", "PM"],
                    required: true
                }
            },
            trainers: [String],
            room: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true
            }
        }
    ]

})


