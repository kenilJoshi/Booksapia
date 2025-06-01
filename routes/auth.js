const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.json({ message: "User created", userId: user._id });
  } catch (err) {
    res.status(400).json({ message: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
