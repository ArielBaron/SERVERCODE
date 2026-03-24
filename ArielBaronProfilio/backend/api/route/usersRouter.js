const express = require('express');
const router = express.Router();
const { Register, getUserByEmail, deleteUser, getAllUsers, Login, Create, getUserFromToken } = require("../controller/usersController");
const { authenticateToken } = require("../middleWare"); // your JWT auth middleware

// Public routes — no token required
router.post("/register", Register);
router.post("/login", Login);

// Protected routes — require valid JWT token
router.get("/me",authenticateToken, getUserFromToken)
router.get("/all", authenticateToken, getAllUsers);
router.get("/:user_email", authenticateToken, getUserByEmail);
router.delete("/:user_email", authenticateToken, deleteUser);
router.post("/create", authenticateToken, Create);

module.exports = router;

