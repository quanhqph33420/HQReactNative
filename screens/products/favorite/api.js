import axios from "axios";
import { ipFavorite } from "@env";

class api {
  async addToFavorite(data) {
    return await axios
      .post(`${ipFavorite}/addToFavorite`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }
  async removeFromFavorite(data) {
    return await axios
      .post(`${ipFavorite}/removeFromFavorite`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }
  async checkInFavorite(data) {
    return await axios
      .post(`${ipFavorite}/checkInFavorite`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new api();
