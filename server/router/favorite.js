const express = require("express");
const router = express.Router();
const controller = require("../controller/favorite");
router.post("/addToFavorite", controller.addToFavorite);
router.post("getProductFavorite", controller.getProductFavorite);
module.exports = router;
