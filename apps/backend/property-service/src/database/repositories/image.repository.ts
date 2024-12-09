
import { uploadFileToS3 } from "@/src/middlewares/upload";
// import { UploadedFile } from "tsoa";
import Image from "@/src/database/models/image.model";

export class ImageRepositories {
    // upload single
    public async uploadFile(file: Express.Multer.File): Promise<any> {
        console.log("Single file:", file);
        try {
            if (!file) {
                throw new Error("No file uploaded");
            }
            // Upload file to S3 and get the URL
            const imageUrl = await uploadFileToS3(file);
            // Save URL to MongoDB
            const image = new Image({ url: imageUrl });
            await image.save();
            return { message: "File uploaded successfully", imageUrl };
        } catch (error) {
            throw error;
        }
    }
    // get upload 
    public async getUploadFile(): Promise<any> {
        try {
            return await Image.find();

        } catch (error) {
            throw error;
        }
    }

}
