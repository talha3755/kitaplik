const request = require("supertest");
const app = require("../app"); // Kök dizindeki app.js dosyasını referans alıyoruz
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const testUser = {
  username: "testuser",
  email: "testuser@example.com",
  password: "Test@1234",
  fullName: "Test User",
  bio: "This is a test user",
};

let token;

beforeAll(async () => {
  await prisma.share.deleteMany({});
  await prisma.note.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth API", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(testUser)
      .expect(201);

    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.username).toBe(testUser.username);
    expect(response.body.user.email).toBe(testUser.email);

    token = response.body.token;
  });

  it("should login the user", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);

    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe(testUser.email);

    token = response.body.token;
  });

  it("should get user profile", async () => {
    const decodedToken = jwt.decode(token);

    const response = await request(app)
      .get("/auth/profile")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty("userId", decodedToken.id);
    expect(response.body.fullName).toBe(testUser.fullName);
    expect(response.body.bio).toBe(testUser.bio);
  });

  it("should update user profile", async () => {
    const updatedProfile = {
      fullName: "Updated User",
      bio: "This is an updated bio",
    };

    const response = await request(app)
      .put("/auth/profile")
      .set("Authorization", `Bearer ${token}`)
      .send(updatedProfile)
      .expect(200);

    expect(response.body.fullName).toBe(updatedProfile.fullName);
    expect(response.body.bio).toBe(updatedProfile.bio);
  });
});
