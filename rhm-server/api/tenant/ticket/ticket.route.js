var express = require("express");
var router = express.Router();

var controller = require("./ticket.controller");
const { authorization } = require("../../../middleware/auth.middleware");

router.get("/", authorization, controller.all);
router.post("/new", authorization, controller.new);

module.exports = router;
