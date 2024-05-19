const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/')); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


// Initialize multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.mimetype.match(/^image\//)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

module.exports = upload;
