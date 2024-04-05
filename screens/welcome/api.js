import { ipLogin } from "@env";
import Storage from "../../key/Storage";
import axios from "axios";
class api {
  async decryptionLogin() {
    const token = await Storage.getData("@keyUser");
    if (token) {
      return await axios
        .post(`${ipLogin}/decryptionLogin`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return false;
    }
  }
  async login(data) {
    if (data) {
      return await axios
        .post(`${ipLogin}/signIn`, data)
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return false;
    }
  }
}
module.exports = new api();
