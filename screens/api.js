import axios from "axios";
import { ipRecent } from "@env";
class api {
  async addRecent(data) {
    return await axios
      .post(`${ipRecent}/addRecent`, data)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async removeRecent(data) {
    return await axios
      .post(`${ipRecent}/removeRecent`, { id: data })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new api();
