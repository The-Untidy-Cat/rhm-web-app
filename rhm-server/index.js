require("dotenv").config();
var cors = require("cors");
var express = require("express");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var app = express();
var tenantRoute = require("./api/tenant/index.route.js");
const sql = require("./utils/sql/index.js");

var PORT = process.env.PORT || 5000;
var HOSTNAME = process.env.HOSTNAME || "localhost";

const origin = ["http://localhost:3000", "http://192.168.1.5:3000", "http://rhm.ddns.net:3000", "http://rhm.ddns.net"];

var corsOptions = {
  origin: origin,
  methods: ["GET", "PUT", "POST"],
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  credentials: true,
  maxAge: 1000 * 60 * 60 * 24,
  exposedHeaders: ["*", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use("/tenant", tenantRoute);

app.all("/", function (req, res) {
  res.status(200).json({ code: 200, message: "Server is running" });
});

app.use((error, req, res, next) => {
  let { statusCode, message, sqlMessage } = error;
  statusCode = statusCode ? statusCode : 500;

  res.status(statusCode).json({
    code: statusCode,
    message: message || sqlMessage,
  });
});

app.use((req, res) => {
  return res.status(404).json({
    code: 404,
    message: "Not Found",
  });
});

app.listen(PORT, HOSTNAME, async function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on ", `http://${HOSTNAME}:${PORT}`);
});
