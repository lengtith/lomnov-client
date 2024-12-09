import { S3Client } from '@aws-sdk/client-s3';
import configs from '@/src/config';

class S3Service {
  private client: S3Client;
  constructor() {
    this.client = new S3Client({
      region: configs.awsRegion,
      credentials: {
        accessKeyId: configs.awsAccessKeyId!,
        secretAccessKey: configs.awsSecretAccessKey!,
      },
    });
  }

  public getClient(): S3Client {
    return this.client;
  }
}

export const s3Service = new S3Service();
