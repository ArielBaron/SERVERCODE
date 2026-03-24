const { client } = require('../model/db');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);
const jwt = require('jsonwebtoken');

module.exports = {
  // Register new user
  Register: async (req, res) => {
    const {

      user_name,
      birth_date,
      user_email,
      user_password,
      phone_number,
      include_email,
      region,
    } = req.body;

    if (
      !user_name ||
      !user_email ||
      !user_password
    ) {
      return res.status(400).json("Required fields missing");
    }

    try {
      const existing = await client.execute({
        sql: `SELECT * FROM users WHERE user_email = ?`,
        args: [user_email],
      });

      if (existing.rows.length > 0) {
        return res.status(409).json("User with this email already exists");
      }

      const HashedPassword = await bcrypt.hash(user_password + process.env.SECRET_CODE, saltRounds);

      await client.execute({
        sql: `INSERT INTO users
        ( user_name,  birth_date, user_email, user_password, phone_number,  include_email, region, is_admin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          user_name,
          birth_date || null,
          user_email,
          HashedPassword,
          phone_number || null,
          include_email ? 1 : 0,
          region || null,
          0,  // Always false for register
        ],
      });

      return res.status(201).json("User registered successfully");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  Create: async (req, res) => {
    const {

      user_name,
      birth_date,
      user_email,
      user_password,
      phone_number,
      include_email,
      region,
    } = req.body;

    if (
      !user_name ||
      !user_email ||
      !user_password
    ) {
      return res.status(400).json("Required fields missing");
    }

    try {
      const existing = await client.execute({
        sql: `SELECT * FROM users WHERE user_email = ?`,
        args: [user_email],
      });

      if (existing.rows.length > 0) {
        return res.status(409).json("User with this email already exists");
      }

      const HashedPassword = await bcrypt.hash(user_password + process.env.SECRET_CODE, saltRounds);

      await client.execute({
        sql: `INSERT INTO users
        ( user_name,  birth_date, user_email, user_password, phone_number,  include_email, region, is_admin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          user_name,
          birth_date || null,
          user_email,
          HashedPassword,
          phone_number || null,
          include_email ? 1 : 0,
          region || null,
          1,  // Always false for register
        ],
      });

      return res.status(201).json("User registered successfully");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Login and return JWT token
  Login: async (req, res) => {
    const { user_email, user_password } = req.body;

    if (!user_email || !user_password) {
      return res.status(400).json("Email and password required");
    }

    try {
      const result = await client.execute({
        sql: `SELECT * FROM users WHERE user_email = ?`,
        args: [user_email],
      });

      if (result.rows.length === 0) {
        return res.status(401).json("Invalid email or password");
      }

      const user = result.rows[0];

      const validPassword = await bcrypt.compare(user_password + process.env.SECRET_CODE, user.user_password);

      if (!validPassword) {
        return res.status(401).json("Invalid email or password");
      }

      // Include isAdmin boolean in token payload
      const token = jwt.sign(
        { email: user.user_email, isAdmin: user.is_admin === 1 },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_TIME }
      );

      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Get all users (protected)
  getAllUsers: async (req, res) => {
    try {
      const result = await client.execute({
        sql: `SELECT * FROM users`
      });
      if (result.rows.length === 0) {
        return res.status(404).json("Users not found");
      }
      return res.status(200).json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Get user info by email (protected)
  getUserByEmail: async (req, res) => {
    const { user_email } = req.params;
    if (!user_email) return res.status(400).json("User email required");

    try {
      const result = await client.execute({
        sql: `SELECT * FROM users WHERE user_email = ?`,
        args: [user_email],
      });
      if (result.rows.length === 0) {
        return res.status(404).json("User not found");
      }
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  // Get user info from token
  getUserFromToken: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // expects "Bearer <token>"

    if (!token) return res.status(401).json({ error: "Token required" });
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET); // verifies signature and expiration
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    try {
      const result = await client.execute({
        sql: `SELECT user_email, user_name, is_admin, birth_date, phone_number, region, include_email
            FROM users WHERE user_email = ?`,
        args: [payload.email],
      });

      if (result.rows.length === 0) return res.status(404).json({ error: "User not founsasdasdd" });

      return res.status(200).json(result.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Delete user by email (admin only)
  deleteUser: async (req, res) => {
    const { user_email } = req.params;
    if (!user_email) return res.status(400).json("User email required");

    try {
      const existing = await client.execute({
        sql: `SELECT * FROM users WHERE user_email = ?`,
        args: [user_email],
      });

      if (existing.rows.length === 0) {
        return res.status(409).json("Could not find user");
      }

      await client.execute({
        sql: `DELETE FROM users WHERE user_email = ?`,
        args: [user_email],
      });

      return res.status(200).json("User deleted successfully");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

};
