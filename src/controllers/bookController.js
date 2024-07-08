const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path"); // path modülünü ekleyin

const addBook = async (req, res) => {
  const { title, author, isbn, shelfInfo } = req.body;

  console.log("Body:", req.body);
  console.log("File:", req.file);

  let coverPath;
  if (req.file) {
    coverPath = path.join("uploads", req.file.filename);
  }

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        shelfInfo,
        cover: coverPath,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Failed to add book:", error);
    res.status(400).json({ error: "Failed to add book!", details: error });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, shelfInfo } = req.body;

  try {
    // Fetch the current book details
    const currentBook = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });

    if (!currentBook) {
      return res.status(404).json({ error: "Book not found!" });
    }

    // Check if ISBN is already in use by another book only if ISBN is being changed
    if (currentBook.isbn !== isbn) {
      const existingBook = await prisma.book.findFirst({
        where: {
          AND: [{ id: { not: parseInt(id) } }, { isbn: isbn }],
        },
      });

      if (existingBook) {
        return res
          .status(400)
          .json({ error: "ISBN already in use by another book!" });
      }
    }

    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author, isbn, shelfInfo },
    });
    res.json(updatedBook);
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("Book_isbn_key")) {
      res.status(400).json({ error: "ISBN already in use by another book!" });
    } else {
      console.error("Failed to update book:", error);
      res.status(400).json({ error: "Failed to update book!", details: error });
    }
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Failed to delete book:", error);
    res.status(400).json({ error: "Failed to delete book!", details: error });
  }
};

const getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id, 10) }, // id'yi parseInt ile sayıya çevirdiğimizden emin olalım
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found!" });
    }

    res.json(book);
  } catch (error) {
    console.error("Failed to fetch book:", error);
    res.status(400).json({ error: "Failed to fetch book!", details: error });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    console.error("Failed to fetch books:", error);
    res.status(400).json({ error: "Failed to fetch books!", details: error });
  }
};

const searchBooks = async (req, res) => {
  const { title, author, isbn } = req.query;

  try {
    let filters = {};

    if (title) {
      filters.title = { contains: title };
    } else if (author) {
      filters.author = { contains: author };
    } else if (isbn) {
      filters.isbn = { contains: isbn };
    }

    const books = await prisma.book.findMany({
      where: filters,
    });

    res.json(books);
  } catch (error) {
    console.error("Failed to search books:", error);
    res.status(400).json({ error: "Failed to search books!", details: error });
  }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getBook,
  getBooks,
  searchBooks,
};
