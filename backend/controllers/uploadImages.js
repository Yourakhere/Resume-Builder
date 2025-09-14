const Resume = require("../models/Resume");
const cloudinary = require("cloudinary").v2;
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadResumeImage = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user._id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }

    const newThumbnail = req.files?.thumbnail?.[0];
    const newProfileImage = req.files?.profileImage?.[0];
 
    if (newThumbnail) { 
      if (resume.thumbnailLink && resume.thumbnailLink.includes("cloudinary")) {
        const publicId = resume.thumbnailLink.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadRes = await cloudinary.uploader.upload(newThumbnail.path, {
        folder: "resumes/thumbnails",
      });

      resume.thumbnailLink = uploadRes.secure_url;
    }
 
    if (newProfileImage) {
      if (
        resume.profileInfo?.profilePreview &&
        resume.profileInfo.profilePreview.includes("cloudinary")
      ) {
        const publicId = resume.profileInfo.profilePreview
          .split("/")
          .pop()
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadRes = await cloudinary.uploader.upload(newProfileImage.path, {
        folder: "resumes/profiles",
      });

      resume.profileInfo.profilePreview = uploadRes.secure_url;
    }

    await resume.save();

    return res.status(200).json({
      message: "Image upload successful",
      thumbnailLink: resume.thumbnailLink,
      profilePreview: resume.profileInfo?.profilePreview,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    return res
      .status(500)
      .json({ message: "Failed to upload image", error: err.message });
  }
};

module.exports = { uploadResumeImage };
