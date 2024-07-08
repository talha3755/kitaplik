const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { username, email, password, fullName, bio } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profile: {
          create: {
            fullName,
            bio,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).send({ user: { id: newUser.id, username, email }, token });
  } catch (error) {
    console.error("Registration failed (catch block):", error);
    res.status(400).send({ error: "Registration failed!", details: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).send({ error: "Unable to login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ error: "Unable to login" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.send({ user, token });
  } catch (error) {
    console.error("Login failed (catch block):", error);
    res.status(400).send({ error: "Login failed!", details: error });
  }
};

const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).send({ error: "Profile not found!" });
    }

    res.send(profile);
  } catch (error) {
    console.error("Failed to fetch profile (catch block):", error);
    res.status(400).send({ error: "Failed to fetch profile!", details: error });
  }
};

const updateProfile = async (req, res) => {
  const { fullName, bio } = req.body;
  const userId = req.user.id;

  try {
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: { fullName, bio },
      create: { userId, fullName, bio },
    });

    res.send(profile);
  } catch (error) {
    console.error("Profile update failed (catch block):", error);
    res.status(400).send({ error: "Profile update failed!", details: error });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
