const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  productName: String,
  productType: String,
  quantity: Number,
  imageUri: String,
  price: Number,
  sold: Number,
  rating: Number,
});
const userModel = mongoose.model("products", userSchema);
module.exports = userModel;
