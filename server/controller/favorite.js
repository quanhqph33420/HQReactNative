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
    const { id } = req.query;
    await userModel
      .find({ _id: id })
      .then((result) => {
        const favorite = result.map((val) => val.favorite);
        res.send(favorite[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async removeFromFavorite(req, res) {
    const { idProduct, idUser } = req.body;
    try {
      const responsive = await userModel.updateMany(
        { _id: idUser },
        {
          $pull: {
            favorite: { idProduct: idProduct },
          },
        }
      );
      res.json(responsive.matchedCount);
    } catch (error) {
      console.log(error);
    }
  }
  async checkInFavorite(req, res) {
    const { idProduct, idUser } = req.body;
    await userModel
      .find({
        _id: idUser,
        "favorite.idProduct": idProduct,
      })
      .then((result) => {
        result.length == 0 ? res.json(0) : res.json(1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new favorite();
