const jwtUtils = require("../utils/jwt");
const sql = require("../utils/sql");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

module.exports = {
  authorization: async (req, res, next) => {
    try {
      req.user = null;
      const token = req.cookies.access_token;
      if (!token) throw new Error("Access Token is missing");
      const data = await jwtUtils.verifyToken(token, "access_token");
      const result = await sql.query("SELECT ID FROM TENANT WHERE ID = :id", {
        id: data.data._id,
      });
      // console.debug(result)
      if (!result.rows[0]) throw new Error("Invalid token");
      req.user = data.data;
      return next();
    } catch (err) {
      return next(err);
    }
  },
};
