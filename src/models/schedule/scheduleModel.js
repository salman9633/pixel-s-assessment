import mongoose from "mongoose";
import { weekdaysSchema } from "./weekdaysSchema";


const scheduleSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now()

    },
    endDate: {
        type: Date,
        required: true
    },
    weekdays: [weekdaysSchema],

},
    {
        timestamps: true
    }
);


const Schedule = mongoose.model('schedule', scheduleSchema);
export default Schedule
