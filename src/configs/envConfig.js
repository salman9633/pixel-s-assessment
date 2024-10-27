import dotenv from "dotenv";
dotenv.config();


export const {
    mongoURI,
    ACCESS_SECRET,
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    PORT

} = process.env; 