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
  async getProductId(data) {
    return await axios
      .post(`${url}getProductId`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }
  async updateProductToCart(data) {
    return await axios
      .post(`${url}updateProductToCart`, data)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
module.exports = new ShoppingCart();
