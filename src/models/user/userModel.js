import mongoose from "mongoose";
import db from '../../configs/dbConfig.js';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        countryCode: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);

export default User