const userModel = require("../model/userModel");
class favorite {
  async addToFavorite(req, res) {
    const { idUser, id, name, img, price, sold, rate } = req.body;
    await userModel
      .find({ "favorite.idProduct": id })
      .then(async (result) => {
        result.length != 1
          ? await userModel
              .findByIdAndUpdate(idUser, {
                $push: {
                  favorite: [
                    {
                      idProduct: id,
                      nameProduct: name,
                      imgProduct: img,
                      nameProduct: name,
                      price: price,
                      sold: sold,
                      rate: rate,
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
  async getProductFavorite(req, res) {
    const id = req.body.id;
    await userModel
      .find({ _id: id })
      .then((result) => {
        const newResult = result.map((val) => val.favorite);
        res.json(newResult);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new favorite();
