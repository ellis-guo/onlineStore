const express = require("express");
const authService = require("../services/auth.service");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.login(username, password);

    // Set httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", user });
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

// GET /api/auth/me - Get current user info
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.userId);
    res.json({ user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
