import color from "../src/color";
import axios from "axios";
const url = color.cart;
class ShoppingCart {
  async addProductToCart(data) {
    return await axios
      .post(`${url}addProductToCart`, data)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
  async removeProduct(data) {
    return await axios
      .post(`${url}removeProductCart`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new ShoppingCart();
