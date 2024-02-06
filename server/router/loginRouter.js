const express = require("express"),
  router = express.Router(),
  controller = require("../controller/loginController");

router.post("/signIn", controller.signIn);
router.post("/signUp", controller.signUp);

module.exports = router;
