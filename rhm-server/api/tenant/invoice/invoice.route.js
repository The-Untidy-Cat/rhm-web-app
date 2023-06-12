var express = require("express");
var router = express.Router();

var controller = require("./invoice.controller");
const { authorization } = require("../../../middleware/auth.middleware");

router.get("/", authorization, controller.all);
router.get("/:id", authorization, controller.id);

module.exports = router;
