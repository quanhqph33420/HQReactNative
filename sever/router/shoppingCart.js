const express = require("express");
const router = express.Router();
const controller = require("../controller/shoppingCart");

router.post("/addProductToCart", controller.addToCart);
router.post("/getProductCart", controller.getProductCart);
router.post("/removeProductCart", controller.removeProductCart);

module.exports = router;
