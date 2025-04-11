const { s3Aws } = require("../utils/s3aws");

class uploadService {
    async execute(filename) {
        console.log("[uploadService] Chamando execute com:", filename);
        const s3 = new s3Aws();
        return await s3.saveFile(filename);
    }
}

module.exports = { uploadService };
