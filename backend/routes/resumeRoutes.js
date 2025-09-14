const express = require("express");
const {
  createResume,
  getUserResume,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");
const { protect } = require("../middlewares/authMiddleware");
const { uploadResumeImage } = require("../controllers/uploadImages");

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getUserResume);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);

router.put("/:id/upload-image", protect, uploadResumeImage);
module.exports = router;
