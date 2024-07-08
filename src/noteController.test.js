const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

const testUser = {
  username: "testuser",
  email: "testuser@example.com",
  password: "Test@1234",
  fullName: "Test User",
  bio: "This is a test user",
};

const testBook = {
  title: "Test Book",
  author: "Test Author",
  isbn: "1234567890",
  shelfInfo: "A1",
};

let token;
let userId;
let bookId;

beforeAll(async () => {
  // Veritabanını temizle
  await prisma.share.deleteMany({});
  await prisma.note.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  // Test kullanıcısını oluştur
  const userResponse = await request(app)
    .post("/auth/register")
    .send(testUser)
    .expect(201);

  token = userResponse.body.token;
  userId = userResponse.body.user.id;

  // Test kitabını oluştur
  const bookResponse = await request(app)
    .post("/books")
    .set("Authorization", `Bearer ${token}`)
    .field("title", testBook.title)
    .field("author", testBook.author)
    .field("isbn", testBook.isbn)
    .field("shelfInfo", testBook.shelfInfo)
    .attach("cover", path.join(__dirname, "../uploads/1720428744283.png"))
    .expect(201);

  bookId = bookResponse.body.id;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Note API", () => {
  it("should add a new note", async () => {
    const newNote = {
      content: "This is a test note",
      isPublic: true,
      bookId: bookId,
    };

    const filePath = path.join(__dirname, "../uploads/1720428744283.png");
    console.log("File exists:", fs.existsSync(filePath)); // Dosya yolunu kontrol et

    const response = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(newNote)
      .expect(201);

    console.log("Response body:", response.body); // Yanıtı kontrol et

    expect(response.body).toHaveProperty("id");
    expect(response.body.content).toBe(newNote.content);
    expect(response.body.isPublic).toBe(newNote.isPublic);
  });

  it("should update a note", async () => {
    const newNote = {
      content: "This is a test note to be updated",
      isPublic: true,
      bookId: bookId,
    };

    const noteResponse = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(newNote)
      .expect(201);

    const updatedNote = {
      content: "This is an updated test note",
      isPublic: false,
    };

    const response = await request(app)
      .put(`/notes/${noteResponse.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedNote)
      .expect(200);

    console.log("Response body:", response.body); // Yanıtı kontrol et

    expect(response.body.content).toBe(updatedNote.content);
    expect(response.body.isPublic).toBe(updatedNote.isPublic);
  });

  it("should delete a note", async () => {
    const newNote = {
      content: "This is a test note to be deleted",
      isPublic: true,
      bookId: bookId,
    };

    const noteResponse = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(newNote)
      .expect(201);

    const response = await request(app)
      .delete(`/notes/${noteResponse.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    console.log("Response body:", response.body); // Yanıtı kontrol et

    expect(response.body).toHaveProperty(
      "message",
      "Note deleted successfully"
    );
  });

  it("should share a note", async () => {
    const newNote = {
      content: "This is a test note to be shared",
      isPublic: true,
      bookId: bookId,
    };

    const noteResponse = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(newNote)
      .expect(201);

    const shareData = {
      userId: userId,
      visibility: "public",
    };

    const response = await request(app)
      .post(`/notes/${noteResponse.body.id}/share`)
      .set("Authorization", `Bearer ${token}`)
      .send(shareData)
      .expect(201);

    console.log("Response body:", response.body); // Yanıtı kontrol et

    expect(response.body).toHaveProperty("id");
    expect(response.body.noteId).toBe(noteResponse.body.id);
    expect(response.body.userId).toBe(shareData.userId);
    expect(response.body.visibility).toBe(shareData.visibility);
  });
});
