const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { upload, processProfileImage } = require("../middleware/upload.middleware");
const userController = require("../controllers/user.controller");

router.get("/profile", authMiddleware, userController.getProfile);

router.post(
    "/update-profile",
    authMiddleware,
    upload.single("image"),
    processProfileImage,
    userController.updateProfile
);

router.delete(
    "/delete-image",
    authMiddleware,
    userController.deleteProfileImage
);

module.exports = router;
