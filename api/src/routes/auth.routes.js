const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../utils/jwt");

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, email, password, fullName, phone } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      fullName,
      phone,
    },
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
      isAdmin: true,
    },
  });

  res.status(201).json({ message: "User created successfully", user: newUser });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find user by username or email
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email: username }],
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Verify password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = generateToken({
    userId: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
  });

  // Set httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  // Return user data (no password)
  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    isAdmin: user.isAdmin,
  };

  res.json({ message: "Login successful", user: userData });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
