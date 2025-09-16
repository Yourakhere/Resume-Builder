const Resume = require("../models/Resume");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
const streamUpload = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

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
      if (resume.thumbnailPublicId) {
        await cloudinary.uploader.destroy(resume.thumbnailPublicId);
      }

      const uploadRes = await streamUpload(
        newThumbnail.buffer,
        "resumes/thumbnails"
      );

      resume.thumbnailLink = uploadRes.secure_url;
      resume.thumbnailPublicId = uploadRes.public_id;  
    }
 
    if (newProfileImage) {
      if (resume.profileInfo?.profilePublicId) {
        await cloudinary.uploader.destroy(resume.profileInfo.profilePublicId);
      }

      const uploadRes = await streamUpload(
        newProfileImage.buffer,
        "resumes/profiles"
      );

      resume.profileInfo.profilePreviewUrl = uploadRes.secure_url;
      resume.profileInfo.profilePublicId = uploadRes.public_id;  
    }

    await resume.save();

    return res.status(200).json({
      message: "Image upload successful",
      thumbnailLink: resume.thumbnailLink,
      profilePreviewUrl: resume.profileInfo?.profilePreviewUrl,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    return res
      .status(500)
      .json({ message: "Failed to upload image", error: err.message });
  }
};

module.exports = { uploadResumeImage };




{/** 
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
*/}
