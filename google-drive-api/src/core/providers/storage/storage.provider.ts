import { S3Client } from "@aws-sdk/client-s3";

export class StorageProvider {
  private readonly sqs = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_KEY as string,
    }
  })

  async store(file: any): Promise<any> {

  }
}