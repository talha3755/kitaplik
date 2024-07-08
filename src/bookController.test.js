const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

let token;

beforeAll(async () => {
  await prisma.share.deleteMany({});
  await prisma.note.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  const userResponse = await request(app)
    .post("/auth/register")
    .send({
      username: "testuser",
      email: "testuser@example.com",
      password: "Test@1234",
      fullName: "Test User",
      bio: "This is a test user",
    })
    .expect(201);

  token = userResponse.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

afterEach(async () => {
  await prisma.share.deleteMany({});
  await prisma.note.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
});

describe("Book API", () => {
  it("should add a new book", async () => {
    const testBook = {
      title: "Test Book",
      author: "Test Author",
      isbn: `1234567890${Date.now()}`, // Benzersiz ISBN kullanın
      shelfInfo: "A1",
    };

    const response = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${token}`)
      .field("title", testBook.title)
      .field("author", testBook.author)
      .field("isbn", testBook.isbn)
      .field("shelfInfo", testBook.shelfInfo)
      .attach("cover", path.join(__dirname, "../uploads/1720428744283.png"))
      .expect(201);

    console.log(response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", testBook.title);
    expect(response.body).toHaveProperty("author", testBook.author);
    expect(response.body).toHaveProperty("isbn", testBook.isbn);
  });
});
