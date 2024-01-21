import axios from "axios";
const url = "http://192.168.202.55:8080/login/";
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
