const express = require("express");
const router = express.Router();
const controller = require("../controller/chatController");

router.get("/getAllUser", controller.getAllUser);
router.get("/getUser", controller.getUser);
router.post("/setUser", controller.setUser);
router.post("/getUseArr", controller.getUseArr);
router.post("/setSkeleton", controller.setSkeleton);
router.post("/sendMessage", controller.sendMessage);
router.get("/getMessage", controller.getMessage);
router.post("/lastMessage", controller.lastMessage);

module.exports = router;
