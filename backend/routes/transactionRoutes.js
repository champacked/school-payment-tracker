//transactionRoutes.js
const express = require("express");
const {
  getAllTransactions,
  getTransactionsBySchool,
  checkTransactionStatus,
  updateTransactionStatus,
  manualStatusUpdate,
} = require("../controllers/transactionController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/transactions", authenticateToken, getAllTransactions);

router.get(
  "/transactions/school/:school_id",
  authenticateToken,
  getTransactionsBySchool
);
router.get(
  "/transactions/status/:custom_order_id",
  authenticateToken,
  checkTransactionStatus
);
router.post("/webhook/status", authenticateToken, updateTransactionStatus);
router.post(
  "/transactions/manual-status",
  authenticateToken,
  manualStatusUpdate
);

module.exports = router;
