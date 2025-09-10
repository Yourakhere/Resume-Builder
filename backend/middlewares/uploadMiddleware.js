const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const nameWithoutExt = file.originalname.split('.').slice(0, -1).join('.') || Date.now().toString();
    return {
      folder: 'myapp/uploads',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      public_id: `${Date.now()}-${nameWithoutExt}`,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
