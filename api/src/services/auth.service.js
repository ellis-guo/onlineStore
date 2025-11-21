const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const prisma = new PrismaClient();

class AuthService {
  // Register new user
  async register(userData) {
    const { username, email, password, fullName, phone } = userData;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        full_name: fullName,
        phone,
      },
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        is_admin: true,
      },
    });

    return newUser;
  }

  // Login user
  async login(username, password) {
    // Find user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email: username }],
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      username: user.username,
      isAdmin: user.is_admin,
    });

    // Return user data (no password) and token
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.full_name,
      isAdmin: user.is_admin,
    };

    return { user: userData, token };
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        is_admin: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.full_name,
      isAdmin: user.is_admin,
    };
  }
}

module.exports = new AuthService();
