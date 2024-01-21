const productModel = require("../model/productModel");
class productController {
  getProducts(req, res) {
    productModel
      .find({})
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }
}
module.exports = new productController();
