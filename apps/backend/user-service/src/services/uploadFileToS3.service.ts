import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Service } from "@/src/middlewares/awsS3";
import configs from "@/src/config";

class UploadFileToS3Service {
  private client: S3Client;
  private bucketName: string;
  private region: string;

  constructor(client: S3Client) {
    this.client = client;
    this.bucketName = configs.awsS3BucketName;
    this.region = configs.awsS3Region;
  }

  public async uploadFile(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
  
    try {
      await this.client.send(new PutObjectCommand(params));
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${params.Key}`;
    } catch (error) {
      console.error("S3 Upload Error:", error);
      throw new Error("Failed to upload file to S3");
    }
  }  

  public async deleteFile(key: string): Promise<void> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key,
      };

      const command = new DeleteObjectCommand(params);
      await this.client.send(command);
      console.log(`File deleted successfully from S3: ${key}`);
    } catch (error) {
      console.error("Error deleting file from S3:", error);
      throw new Error("Error deleting file from S3: " + error);
    }
  }
}

const uploadFileToS3Service = new UploadFileToS3Service(s3Service.getClient());

export default uploadFileToS3Service;
