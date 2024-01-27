const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  fullname: String,
  cart: {
    idProduct: String,
  },
  phone: String,
  password: String,
});
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
