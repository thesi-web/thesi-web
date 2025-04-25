import dotenv from "dotenv";
import aws from "aws-sdk";
import path from "path";
import mime from "mime-types";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Corrige o __dirname que não existe em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

class s3Aws {
  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
    });
  }

  async saveFile(filename) {
    
    const extension = path.extname(filename);
    const sanitizedFilename = `arquivo-${uuidv4()}${extension}`;

    const contentType = mime.lookup(filename);
    const originalPath = path.resolve(__dirname, '..', 'uploads', filename);

    if (!contentType) {
      throw new Error("Tipo de conteúdo não encontrado");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: sanitizedFilename,
      Body: fileContent,
      ContentType: contentType,
      ACL: 'public-read'
    }).promise();

    return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${sanitizedFilename}`;
  }
}

export { s3Aws };
