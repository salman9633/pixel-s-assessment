import mongoose from "mongoose"


export const priceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: ["INR", "USD"],

    },
    taxRate: {
        type: Number,
        required: true
    }
})