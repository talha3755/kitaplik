const request = require("supertest");
const app = require("../app"); // Doğru dosya yolunu burada kontrol edin
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

describe("Book API", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should add a new book", async () => {
    const response = await request(app)
      .post("/books")
      .field("title", "Test Book")
      .field("author", "Test Author")
      .field("isbn", "1234567890")
      .field("shelfInfo", "A1")
      .attach("cover", path.join(__dirname, "uploads/register.png"));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", "Test Book");
    expect(response.body).toHaveProperty("author", "Test Author");
    expect(response.body).toHaveProperty("isbn", "1234567890");
  });
});
