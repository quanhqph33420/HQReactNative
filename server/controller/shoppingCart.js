const userModel = require("../model/userModel");
const productModel = require("../model/productModel");
class shoppingCart {
  async addToCart(req, res) {
    const idUser = req.body.idUser;
    const id = req.body.id;
    const img = req.body.img;
    const name = req.body.name;
    const price = req.body.price;
    const size = req.body.size;
    await userModel
      .find({ "cart.idProduct": id })
      .then(async (result) => {
        result.length != 1
          ? await userModel
              .findByIdAndUpdate(idUser, {
                $push: {
                  cart: [
                    {
                      idProduct: id,
                      imgProduct: img,
                      nameProduct: name,
                      price: price,
                      size: size,
                    },
                  ],
                },
              })
              .then((result) => {
                res.json(1);
              })
              .catch((err) => {
                console.log(err);
              })
          : res.json("0");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getProductCart(req, res) {
    const id = req.body.id_;
    await userModel
      .find({ _id: id })
      .then(async (result) => {
        const cart = await result.map((val, i) => val.cart);
        res.json(cart);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async removeProductCart(req, res) {
    const idUser = req.body.pop().idUser;
    const data = req.body;
    var matchCount = 0;
    for (const e of data) {
      try {
        const responsive = await userModel.updateMany(
          { _id: idUser },
          { $pull: { cart: { idProduct: e.id } } }
        );
        matchCount += responsive.matchedCount;
      } catch (error) {
        console.log(error);
      }
    }
    res.json(matchCount);
  }
  async getProductId(req, res) {
    const id = req.body.id;
    await productModel
      .find({ _id: id })
      .then(async (result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async updateProductToCart(req, res) {
    const idUser = req.body.idUser;
    const idProduct = req.body.id;
    const price = req.body.price;
    const name = req.body.name;
    const img = req.body.image;
    const size = req.body.size;
    await userModel
      .updateMany(
        { _id: idUser, "cart.idProduct": idProduct },
        {
          $set: {
            "cart.$": {
              idProduct: idProduct,
              nameProduct: name,
              imgProduct: img,
              price: price,
              size: size,
            },
          },
        }
      )
      .then((result) => {
        res.json(result.matchedCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new shoppingCart();
