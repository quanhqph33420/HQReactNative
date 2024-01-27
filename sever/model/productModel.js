const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  productName: String,
  productType: String,
  info: {
    size: String,
    quantity: Number,
    price: Number,
  },
  imageUri: String,
  rating: Number,
  sold: Number,
});
const userModel = mongoose.model("products", userSchema);
module.exports = userModel;
