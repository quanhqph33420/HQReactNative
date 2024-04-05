import axios from "axios";
import { ipLogin } from "@env";
import Storage from "../../../key/Storage";

class api {
  async signIn(data) {
    if (data) {
      return await axios
        .post(`${ipLogin}/signIn`, data)
        .then((result) => result.data)
        .catch((err) => console.log(err));
    }
    return false;
  }
  async signUp(data) {
    if (data) {
      return await axios
        .post(`${ipLogin}/signUp`, data)
        .then((result) => result.data)
        .catch((err) => console.log(err));
    } else return false;
  }
  async encryptionLogin(data, idUser) {
    await Storage.setData("@infoUser", idUser);
    console.log("Saved id User");
    if (data) {
      return await axios
        .post(`${ipLogin}/encryptionLogin`, data)
        .then(async (result) => {
          await Storage.setData("@keyUser", result.data);
          console.log("Save key complete")
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
