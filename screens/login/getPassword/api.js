import axios from "axios";
import { ipPassword } from "@env";
class api {
  async createOtp(data) {
    return axios
      .post(`${ipPassword}/createOtp`, { to: data })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async findEmail(data) {
    return axios
      .post(`${ipPassword}/findEmail`, data)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async updatePassword(data) {
    if (data) {
      return axios
        .post(`${ipPassword}/updatePassword`, data)
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
