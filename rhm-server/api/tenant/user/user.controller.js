const { findUser } = require("../index.service");

require("dotenv").config();

module.exports = {
  info: async (req, res, next) => {
    try {
      let result = await findUser(req.user._id);
      return res.status(200).json({
        code: 200,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  },
  logout: async (req, res, next) => {
    try {
      return res
        .clearCookie("access_token", {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        })
        .status(200)
        .json({
          code: 200,
          data: "Logout successfully!",
        });
    } catch (e) {
      next(e);
    }
  },
};
