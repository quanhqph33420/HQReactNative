const dotenv = require("dotenv"),
  jwt = require("jsonwebtoken");
dotenv.config();
const secret_key = process.env.SECRET_KEY;
const header_key = process.env.HEDER_KEY;
class loginController {
  signIn(req, res) {
    const user = { username: "1123", password: "1233" };

    const token = jwt.sign(user, secret_key);
    const veryfied = jwt.verify(token, secret_key);
    res.send(token + "///" + JSON.stringify(veryfied));
  }
  signUp(req, res) {}
}
module.exports = new loginController();
