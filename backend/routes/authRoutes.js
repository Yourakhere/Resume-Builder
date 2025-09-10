const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = req.file.path || req.file.secure_url || req.file.url;
  res.status(200).json({ imageUrl });
});

module.exports = router;
