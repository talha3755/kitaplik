const express = require("express");
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getBook,
  searchBooks,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/search", searchBooks);
router.post("/", addBook);
router.get("/", getBooks);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/:id", getBook);

module.exports = router;
