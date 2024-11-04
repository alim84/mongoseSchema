const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3002;

const poroductsSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Products", poroductsSchema);
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/textProductDB");
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error.massage);
    process.exit(1);
  }
};

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});
