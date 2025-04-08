import Image from '../models/image.model.js'
import { getUploadSignedUrls } from '../config/s3.config.js'
import { v4 as generateUuidV4 } from 'uuid'

export const generateKeysAndGetUploadSignedUrl = async (req, res, next) => {
    try {
        const { images } = req.body;

        // Validate image count
        if (!images || images.length < 1 || images.length > 15) {
            return res.status(400).json({
                success: false,
                message: "Please upload valid number of images [image limit - 1 to 15]!"
            });
        }

        // Validate each image has a title
        const isValidImages = images.every(img => img.title);
        if (!isValidImages) {
            return res.status(400).json({
                success: false,
                message: "Each image must contain a 'title'"
            });
        }

        // Generate unique keys and file details for S3 upload
        const keys = images.map((img) => {
            const uniqueKey = `images/${generateUuidV4()}-date-${Date.now()}`; // or png, etc. based on your use case
            img.key = uniqueKey; // Attach key to image object
            return uniqueKey
        });

        // Get signed URLs for uploading
        const signedUrls = await getUploadSignedUrls(keys);

        // Insert image with keys into db
        const uploadedImages = await Image.insertMany(images);

        // Send back signed URLs and saved data
        res.status(201).json({
            success: true,
            message: "Images uploaded successfully!",
            signedUrls,
            responseData: uploadedImages
        });
    } catch (error) {
        console.error("Error uploading images :: ", error);
        res.status(500).json({
            success: false,
            message: "Server error while uploading images"
        });
    }
};