var express = require("express");
var router = express.Router();

var controller = require("./auth.controller");
const { googleCallback } = require("../../../utils");

router.get("/google", async (req, res) => {
    const url = getAuthUrl();
    res.status(200).json({code: 200, status: "success", data: url });
  });

router.post("/login", controller.login);
router.get("/google/callback", googleCallback, controller.google);

module.exports = router;
