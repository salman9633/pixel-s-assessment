
import mongoose from "mongoose";
import { priceSchema } from "./priceSchema.js";

const courseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schedule',
    },
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Student", "Teacher"]
    },
    branch: {
        type: String,
        required: true,
    },
    memberRegistationLimit: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        required: true,
        enum: ["Online", "Offline"]
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Expert"]
    },
    calorieBurned: {
        value: Number,
        unit: {
            type: String,
            enum: ["Kcal", "Kg"]
        },
    },
    benefit: [String],
    bringYourOwnKit: [String],
    description: {
        type: String
    },
    isPrivate: {
        type: Boolean,
        required: false
    },
    price: [priceSchema],
    moduleOptions: {
        allowInstallments: { type: Boolean, default: false },
        allowJoiningAnytime: { type: Boolean, default: false },
        autoConfirmWaitlist: { type: Boolean, default: false }
    },
    registrationStartDate: {
        isActive: { type: Boolean, default: false },
        value: String,
    },
    bookingDeadline: {
        isActive: { type: Boolean, default: false },
        value: Number,
        unit: {
            type: String,
            enum: ["Hours", "Days", "Weeks", "Months"]
        }
    },
    reminderBeforeCourse: {
        isActive: { type: Boolean, default: false },
        value: Number,
        unit: {
            type: String,
            enum: ["Hours", "Days", "Weeks", "Months"]
        }
    },
    cancellationPeriod: {
        isActive: { type: Boolean, default: false },
        value: Number,
        unit: {
            type: String,
            enum: ["Hours", "Days", "Weeks", "Months"]
        }
    },
    unPaidBookingCancellation: {
        isActive: { type: Boolean, default: false },
        value: Number,
        unit: {
            type: String,
            enum: ["Hours", "Days", "Weeks", "Months"]
        }
    },
    allowWaitlistBooking: {
        isActive: { type: Boolean, default: false },
        value: Number,
    },
    bookingForFriends: {
        isActive: { type: Boolean, default: false },
        value: Number,
    },
    ageRestriction: {
        isActive: { type: Boolean, default: false },
        minAge: {
            type: Number,
        },
        maxAge: {
            type: Number
        },
    },
    genderRestriction: {
        isActive: { type: Boolean, default: false },
        gender: {
            type: String,
            enum: ["Male", "Female", "Others"]
        },
    }

}, {
    timestamps: true
})

const Course = mongoose.model('course', courseSchema);

export default Course