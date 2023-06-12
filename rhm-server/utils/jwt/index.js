const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  generateToken: (user, type) => {
    let secretKey = process.env.SECRET_KEY;
    let expiresIn = "1d";
    switch (type) {
      case "access_token":
        secretKey += "|access_token";
        expiresIn = "1d";
        break;
      case "refresh_token":
        secretKey += "|refresh_token";
        expiresIn = "30d";
        break;
      default:
        secretKey += "|access_token";
        expiresIn = "1d";
    }
    return new Promise((resolve, reject) => {
      jwt.sign(
        { data: user },
        secretKey,
        {
          algorithm: "HS256",
          expiresIn: expiresIn,
        },
        (error, token) => {
          if (error) {
            return reject(error);
          }
          resolve(token);
        }
      );
    });
  },
  verifyToken: (token, type) => {
    let secretKey = process.env.SECRET_KEY;
    switch (type) {
      case "access_token":
        secretKey += "|access_token";
        break;
      case "refresh_token":
        secretKey += "|refresh_token";
        break;
      default:
        secretKey += "|access_token";
    }
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });
  },
};
