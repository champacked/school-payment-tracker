//authRoutes.js
const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();
console.log("controller reached here");
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
