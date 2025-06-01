const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Book = require("../models/Book");
const Review = require("../models/Review");

router.post("/", auth, async (req, res) => {
  const book = await Book.create({ ...req.body, createdBy: req.user._id });
  res.json(book);
});

router.get("/", async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");
  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(books);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  const reviews = await Review.find({ book: book._id });
  const avgRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : null;
  res.json({ book, avgRating, reviews });
});

router.get("/search", async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [{ title: new RegExp(q, "i") }, { author: new RegExp(q, "i") }],
  });
  res.json(books);
});

module.exports = router;
