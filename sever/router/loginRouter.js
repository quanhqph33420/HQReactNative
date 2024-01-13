const express = require("express"),
  router = express.Router(),
  controller = require("../controller/loginController");

router.get("/signIn", controller.signIn);

module.exports = router;
