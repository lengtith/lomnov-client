//src/middlewares/upload.ts

import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Check if environment variables are defined
if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME is not defined in environment variables.");
}

// Configure multer to use S3 for storage
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME as string, // Cast to string
        key: (_req, file, cb) => {
            const fileName = `${Date.now().toString()}_${file.originalname}`;
            cb(null, fileName);
        },
    }),
});

// Export the upload middleware
export const uploadMiddleware = upload.array('files'); // Assuming multiple files are uploaded under 'files'

// This function is used when you want to upload a single file and return the URL
export const uploadFileToS3 = (file: Express.Multer.File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME as string, // Cast to string
            Key: `${Date.now().toString()}_${file.originalname}`, // Generate a unique filename
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        // Use the correct callback types directly
        s3.upload(uploadParams, (error: Error | null, data: AWS.S3.ManagedUpload.SendData) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.Location); // URL of the uploaded file
            }
        });
    });
};

export default upload;