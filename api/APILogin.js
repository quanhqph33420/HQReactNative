import axios from "axios";
import uri from "../src/color";
const url = uri.login;
class API {
  async signIn(data) {
    if (data) {
      return await axios
        .post(`${url}signIn`, data)
        .then((result) => result.data)
        .catch((err) => console.log(err));
    }
    return false;
  }
  async signUp(data) {
    if (data) {
      return await axios
        .post(`${url}signUp`, data)
        .then((result) => result.data)
        .catch((err) => console.log(err));
    } else return false;
  }
}
module.exports = new API();
