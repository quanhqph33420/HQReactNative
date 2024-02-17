const mongoose = require("mongoose");
const textChatModelSchema = new mongoose.Schema({
  message: [],
});
const textChatModel = mongoose.model("textChat", textChatModelSchema);
module.exports = textChatModel;
