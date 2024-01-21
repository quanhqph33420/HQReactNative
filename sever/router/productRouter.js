const express = require("express"),
  router = express.Router(),
  controller = require("../controller/productController");

router.get("/getProducts", controller.getProducts);

module.exports = router;
