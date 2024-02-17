const userModel = require("../model/userModel");
const chatModel = require("../model/chatModel");
const textChatModel = require("../model/textChatModel");
class chatController {
  async getAllUser(req, res) {
    const { id } = req.query;
    await userModel
      .find({})
      .then(async (result) => {
        const filter = await result.filter((val, i) => val._id != id);
        var data = [];
        await filter.forEach((e) => {
          data.push({
            _id: e._id,
            avatar: e.avatar,
            fullname: e.fullname,
            lastChat: e.lastChat,
          });
        });
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getUser(req, res) {
    const { id } = req.query;
    await userModel
      .find({ _id: id })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async setUser(req, res) {
    const arr = req.body;
    await chatModel
      .find({ listUser: arr })
      .then(async (result) => {
        if (result == "") {
          await chatModel
            .insertMany({ listUser: arr })
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.json("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getUseArr(req, res) {
    const arr = req.body;

    await chatModel
      .find({ listUser: arr })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async setSkeleton(req, res) {
    const { id, messages } = req.body;
    await textChatModel
      .insertMany({ _id: id, messages: messages })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new chatController();