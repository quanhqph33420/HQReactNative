const userModel = require("../model/userModel");
class loginController {
  async signIn(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    await userModel
      .find({ username: username, password: password })
      .then((result) => {
        result == "" ? res.json("") : res.json(result[0]._id);
      })
      .catch((err) => console.log(err));
  }
  async signUp(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const fullname = req.body.fullname;
    const phone = req.body.phone;
    await userModel
      .find({ username: username })
      .then(async (result) => {
        if (result.length == 1) {
          res.json(-1);
        } else {
          await userModel
            .insertMany({
              username: username,
              email: email,
              fullname: fullname,
              phone: phone,
              password: password,
            })
            .then((result) => res.json(result.length))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
}
module.exports = new loginController();
