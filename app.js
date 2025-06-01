const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const reviewRoutes = require("./routes/reviews");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => res.send("Book Review API"));

module.exports = app;
