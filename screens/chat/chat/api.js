import { ipChat } from "@env";
import axios from "axios";
import Storage from "../../../key/Storage";
class api {
  async getUser(id) {
    return await axios
      .get(`${ipChat}/getUser`, { params: { id: id } })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }
  async getUserArr(arr_id) {
    await axios
      .post(`${ipChat}/getUserArr`, arr_id)
      .then(async (result) => {
        await Storage.setData("@idMessage", result.data[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async setUser(arr_id) {
    await axios
      .post(`${ipChat}/setUser`, arr_id)
      .then(async (result) => {
        if (result.data != "") {
          await axios.post(`${ipChat}/setSkeleton`, {
            id: result.data[0]._id,
            message: [],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getMessage() {
    let idMessage = await Storage.getData("@idMessage");
    return await axios
      .get(`${ipChat}/getMessage`, {
        params: {
          id: idMessage,
        },
      })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async sendMessage(data) {
    if (data) {
      return await axios
        .post(`${ipChat}/sendMessage`, data)
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
