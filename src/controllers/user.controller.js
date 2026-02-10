const db = require("../models");
const fs = require("fs");
const path = require("path");

const User = db.User;

/**
 * GET PROFILE
 */
async function getProfile(req, res) {
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] }
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    res.json({
        ...user.toJSON(),
        profileImage: user.profileImage
            ? `${baseUrl}/uploads/profile/${user.profileImage}`
            : null
    });
}

/**
 * UPDATE PROFILE
 */
async function updateProfile(req, res) {
    const user = await User.findByPk(req.user.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const { name, phone, bio } = req.body;

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.bio = bio || user.bio;

    // Replace image
    if (req.profileImage) {
        if (user.profileImage) {
            const oldPath = path.join(
                "uploads/profile",
                user.profileImage
            );
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
        user.profileImage = req.profileImage;
    }

    await user.save();

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    res.json({
        message: "Profile updated successfully",
        user: {
            ...user.toJSON(),
            profileImage: user.profileImage
                ? `${baseUrl}/uploads/profile/${user.profileImage}`
                : null
        }
    });
}

/**
 * DELETE PROFILE IMAGE
 */
async function deleteProfileImage(req, res) {
    const user = await User.findByPk(req.user.id);
    if (!user || !user.profileImage) {
        return res.status(404).json({ message: "Image not found" });
    }

    const imagePath = path.join("uploads/profile", user.profileImage);

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    user.profileImage = null;
    await user.save();

    res.json({ message: "Profile image deleted" });
}

module.exports = {
    getProfile,
    updateProfile,
    deleteProfileImage
};
