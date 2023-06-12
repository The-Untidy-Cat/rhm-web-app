var express = require("express");
var router = express.Router();
var authRoute = require("./auth/auth.route");
var invoiceRoute = require("./invoice/invoice.route");
var ticketRoute = require("./ticket/ticket.route");
var userRoute = require("./user/user.route");
var contractRoute = require("./contract/contract.route");

router.use("/auth", authRoute);
router.use("/invoice", invoiceRoute);
router.use("/ticket", ticketRoute);
router.use("/user", userRoute);
router.use("/contract", contractRoute);

module.exports = router;
