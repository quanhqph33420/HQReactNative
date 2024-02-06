const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  fullname: String,
  cart: [
    {
      idProduct: String,
      nameProduct: String,
      imgProduct: String,
      price: Number,
      size: Number,
    },
  ],
  favorite: [
    {
      idProduct: String,
      nameProduct: String,
      imgProduct: String,
      price: Number,
      sold: Number,
      rate: Number,
    },
  ],
  phone: String,
  password: String,
});
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
