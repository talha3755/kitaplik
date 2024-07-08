const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addNote = async (req, res) => {
  const { content, isPublic, bookId } = req.body;
  const userId = req.user.id;

  try {
    const newNote = await prisma.note.create({
      data: {
        content,
        isPublic,
        bookId,
        userId,
      },
    });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Failed to add note:", error);
    res.status(400).json({ error: "Failed to add note!", details: error });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { content, isPublic } = req.body;

  try {
    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id) },
      data: { content, isPublic },
    });
    res.json(updatedNote);
  } catch (error) {
    console.error("Failed to update note:", error);
    res.status(400).json({ error: "Failed to update note!", details: error });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    // Öncelikle belirtilen id'ye sahip bir not olup olmadığını kontrol edelim
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found!" });
    }

    await prisma.note.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Failed to delete note:", error);
    res.status(400).json({ error: "Failed to delete note!", details: error });
  }
};

const shareNote = async (req, res) => {
  const { id } = req.params;
  const { userId, visibility } = req.body;

  try {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found!" });
    }

    const newShare = await prisma.share.create({
      data: {
        noteId: parseInt(id),
        userId,
        visibility,
      },
    });

    res.status(201).json(newShare);
  } catch (error) {
    console.error("Failed to share note:", error);
    res.status(400).json({ error: "Failed to share note!", details: error });
  }
};
module.exports = {
  addNote,
  updateNote,
  deleteNote,
  shareNote,
};
