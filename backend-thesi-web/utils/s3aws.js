const aws = require("aws-sdk");
const path = require("path");
const mime = require("mime-types");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

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

    return {
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${sanitizedFilename}`,
      filename: sanitizedFilename
    };
  }
}

module.exports = { s3Aws };
