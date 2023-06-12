const sql = require("../../../utils/sql/index");
const { checkEmpty } = require("../../../utils");
require("dotenv").config();

module.exports = {
  isExistAccount: async (data) => {
    try {
      const { username, password } = data;
      var result = await sql.query(
        `SELECT ID, NAME, PHONE_NUMBER, EMAIL, ID_NUMBER FROM TENANT WHERE PHONE_NUMBER = :username AND PASSWORD = :password`,
        { username: username, password: password }
      );
      if (!result.rows[0]) return null;
      return {
        _id: result.rows[0][0],
        name: result.rows[0][1],
        phoneNumber: result.rows[0][2],
        email: result.rows[0][3],
        idNumber: result.rows[0][4],
      };
    } catch (e) {
      throw new Error(e);
    }
  },
  isExistEmail: async (data) => {
    try {
      const { email } = data;
      var result = await sql.query(
        `SELECT ID, NAME, PHONE_NUMBER, EMAIL, ID_NUMBER FROM TENANT WHERE EMAIL = :email`,
        { email: email }
      );
      if (!result.rows.length) return null;
      return {
        _id: result.rows[0][0],
        name: result.rows[0][1],
        phoneNumber: result.rows[0][2],
        email: result.rows[0][3],
        idNumber: result.rows[0][4],
      };
    } catch (e) {
      throw new Error(e);
    }
  },
  setCookie: async (req, res, next) => {
    try {
      var { accessToken } = req.token;
      if (!accessToken) throw new Error("Access Token is missing");
      await res.cookie("access_token", accessToken, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        maxAge: 3600000 * 24,
      });
      delete accessToken;
    } catch (err) {
      throw new Error(err);
    }
  },
};
