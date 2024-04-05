import axios from "axios";
import { ipCart } from "@env";

class ShoppingCart {
  async addProductToCart(data) {
    return await axios
      .post(`${ipCart}/addProductToCart`, data)
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
      .post(`${ipCart}/removeProductCart`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }

  async getProductId(data) {
    return await axios
      .post(`${ipCart}/getProductId`, data)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }

  async updateProductToCart(data) {
    return await axios
      .post(`${ipCart}/updateProductToCart`, data)
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
