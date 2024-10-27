import cloudinary from "../../configs/cloudinaryConfig.js";

export const uploadImagetoCloudinary = async (buffer) => {
    try {
        const result = await cloudinary.uploader.upload(buffer, {
            folder: "pixels-course-images",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });
        
        return {
            url: result.secure_url,
            public_id: result.public_id
        };
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Failed to upload image");
    }
};