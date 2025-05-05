const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const Store = require("../models/store");

// Customer Registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: "customer",
    });

    await user.save();
    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Customer Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: "customer" });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret");
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all stores (for customer dashboard)
router.get("/stores", async (req, res) => {
  try {
    const stores = await Store.find().populate("owner", "username");
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
