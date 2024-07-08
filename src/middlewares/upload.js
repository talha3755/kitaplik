const multer = require("multer");
const path = require("path");

// Multer storage ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Dosyaların kaydedileceği dizin
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Dosya adını belirleme
  },
});

// Dosya filtreleme
const fileFilter = (req, file, cb) => {
  // Sadece resim dosyalarına izin ver
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Maksimum dosya boyutu: 5MB
});

module.exports = upload;
