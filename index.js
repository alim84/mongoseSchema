const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const poroductsSchema = new mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String, require: true },
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
app.get("/products", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.desctription,
    });
    const productData = await newProduct.save();
    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
