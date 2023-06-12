const { checkEmpty } = require("../../../utils");
const tokenConfig = require("../../../utils/jwt");
const sql = require("../../../utils/sql/index");
const { findUser } = require("../index.service");
const {
  setCookie,
  isExistAccount,
  isExistEmail
} = require("./auth.service");
require("dotenv").config();

module.exports = {
  login: async (req, res, next) => {
    try {
      checkEmpty(req.body.username, req.body.password);
      let account = await isExistAccount(req.body);
      if (!account)
        return res.status(400).json({
          code: 400,
          message: "Sai tài khoản hoặc mật khẩu",
        });
      const accessToken = await tokenConfig.generateToken(account, "access_token")
      req.token = { accessToken};
      await setCookie(req, res, next);
      return res.status(200).json({
        code: 200,
        message: "Đăng nhập thành công",
        data: {
          user: {...account},
        },
      });
    } catch (e) {
      next(e);
    }
  },
  google: async (req, res, next) => {
    try {
      checkEmpty(req.user);
      let user = await isExistEmail(req.user);
      console.debug(user);
      if (!user)
        return res.status(400).json({
          code: 400,
          message: "Không tìm thấy tài khoản",
        });
      const accessToken = await tokenConfig.generateToken(user, "access_token");
      req.token = { accessToken };
      await setCookie(req, res, next);
      return res.status(200).json({
        code: 200,
        message: "Login successfully",
        data: {
          user: {...user, access_token: accessToken},
        },
      });
    } catch (e) {
      next(e);
    }
  },
};
