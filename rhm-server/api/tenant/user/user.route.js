var express = require("express");
var router = express.Router();

const { authorization } = require("../../../middleware/auth.middleware");
const { info, logout } = require("./user.controller");

router.get("/info", authorization, info);
router.get("/logout", logout);

module.exports = router;
