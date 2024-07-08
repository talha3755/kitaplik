const express = require("express");
const {
  addNote,
  updateNote,
  deleteNote,
  shareNote,
} = require("../controllers/noteController");
const { authenticate } = require("../middlewares/authenticate");
const router = express.Router();

router.post("/", authenticate, addNote);
router.put("/:id", authenticate, updateNote);
router.delete("/:id", authenticate, deleteNote);
router.post("/:id/share", authenticate, shareNote);

module.exports = router;
