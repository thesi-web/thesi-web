require("dotenv").config();
const aws = require('aws-sdk');
const path = require('path');
const mime = require('mime-types');
const fs = require('fs');

class s3Aws {

    constructor() {
        this.client = new aws.S3({
            region: process.env.AWS_REGION,
        });
    }

    async saveFile(filename) {

        const originalPath = path.resolve(__dirname, '..', 'uploads', filename);

        const contentType = mime.lookup(filename);

        if (!contentType) {
            throw new Error("Tipo de conteúdo não encontrado");
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client.putObject({
            Bucket: process.env.S3_BUCKET,
            Key: filename,
            Body: fileContent,
            ContentType: contentType,
            ACL: 'public-read'
        }).promise();

        return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${filename}`;

    }
}

module.exports = { s3Aws };
