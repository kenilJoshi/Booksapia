const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Review = require("../models/Review");

router.post("/:bookId", auth, async (req, res) => {
  const { rating, comment } = req.body;
  const existing = await Review.findOne({
    book: req.params.bookId,
    user: req.user._id,
  });
  if (existing)
    return res.status(400).json({ message: "You already reviewed this book" });
  const review = await Review.create({
    book: req.params.bookId,
    user: req.user._id,
    rating,
    comment,
  });
  res.json(review);
});

router.put("/:id", auth, async (req, res) => {
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!review)
    return res.status(404).json({ message: "Review not found or not yours" });
  res.json(review);
});

router.delete("/:id", auth, async (req, res) => {
  const review = await Review.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!review)
    return res.status(404).json({ message: "Review not found or not yours" });
  res.json({ message: "Review deleted" });
});

module.exports = router;
