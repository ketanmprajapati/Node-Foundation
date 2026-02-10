const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith("image/")) {
            cb(new Error("Only image files allowed"));
        }
        cb(null, true);
    }
});

async function processProfileImage(req, res, next) {
    if (!req.file) return next();

    const uploadDir = "uploads/profile";
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `profile_${Date.now()}.jpg`;
    const filepath = `${uploadDir}/${filename}`;

    await sharp(req.file.buffer)
        .resize(300, 300) // resize to 300x300
        .jpeg({ quality: 80 })
        .toFile(filepath);

    req.profileImage = filename;
    next();
}

module.exports = {
    upload,
    processProfileImage
};
