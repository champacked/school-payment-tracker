const Transaction = require("../models/Transaction");

// Fetch All Transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({}, "-__v");
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Error fetching transactions." });
  }
};

// Fetch Transactions by School
exports.getTransactionsBySchool = async (req, res) => {
  const { school_id } = req.params;
  try {
    const transactions = await Transaction.find({ school_id });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Error fetching transactions." });
  }
};

// Check Transaction Status
exports.checkTransactionStatus = async (req, res) => {
  const { custom_order_id } = req.params;
  try {
    const transaction = await Transaction.findOne({ custom_order_id });
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: "Transaction not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Error checking transaction status." });
  }
};

// Webhook for Status Updates
exports.updateTransactionStatus = async (req, res) => {
  const { status, order_info } = req.body;

  if (!order_info || !order_info.order_id) {
    return res.status(400).json({ error: "Invalid payload format" });
  }

  const [collect_id, transaction_id] = order_info.order_id.split("/");

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { collect_id, _id: transaction_id },
      {
        status: status === 200 ? "Completed" : "Failed",
        order_amount: order_info.order_amount,
        transaction_amount: order_info.transaction_amount,
        gateway: order_info.gateway,
      },
      { new: true }
    );

    if (transaction) {
      return res.status(200).json({
        message: "Transaction status updated successfully",
        transaction,
      });
    } else {
      return res.status(404).json({ error: "Transaction not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to update transaction status" });
  }
};

// Manual Status Update
exports.manualStatusUpdate = async (req, res) => {
  const { collect_id, transaction_id, status } = req.body;

  if (!collect_id || !transaction_id || !status) {
    return res
      .status(400)
      .json({
        error: "Missing required fields: collect_id, transaction_id, or status",
      });
  }

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { collect_id, _id: transaction_id },
      { status },
      { new: true }
    );

    if (transaction) {
      return res.status(200).json({
        message: "Transaction status updated manually",
        transaction,
      });
    } else {
      return res.status(404).json({ error: "Transaction not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to manually update transaction status" });
  }
};
