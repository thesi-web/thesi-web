const { s3Aws } = require("../utils/s3aws");

class UploadService {
    async execute(filename) {
        const s3 = new s3Aws();
        return await s3.saveFile(filename);
    }
}

module.exports = { UploadService };
