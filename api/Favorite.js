import axios from "axios";
import color from "../src/color";
const url = color.favorite;
class Favorite {
  async addToFavorite(data) {
    return await axios
      .post(`${url}addToFavorite`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }
  async removeFromFavorite(data) {
    return await axios
      .post(`${url}removeFromFavorite`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }
  async checkInFavorite(data) {
    return await axios
      .post(`${url}checkInFavorite`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new Favorite();
