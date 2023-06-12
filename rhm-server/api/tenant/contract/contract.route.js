var express = require("express");
var router = express.Router();

const { authorization } = require("../../../middleware/auth.middleware");
const { all } = require("./contract.controller");

router.get("/", authorization, all);

module.exports = router;
