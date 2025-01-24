// app.js
const express = require("express");
const dotenv = require("dotenv");
const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
var cors = require("cors");

dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", transactionRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8789;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
``;
