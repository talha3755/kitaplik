const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bookRoutes = require("./src/routes/bookRoutes");
const authRoutes = require("./src/routes/authRoutes");
const noteRoutes = require("./src/routes/noteRoutes");
const errorHandler = require("./src/middlewares/errorHandler");

require("dotenv").config();

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  "/books",
  (req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
      upload.single("cover")(req, res, next);
    } else {
      next();
    }
  },
  bookRoutes
);
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.use(errorHandler);

module.exports = app;
