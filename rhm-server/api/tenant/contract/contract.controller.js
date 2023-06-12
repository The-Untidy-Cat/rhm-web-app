const { all } = require("./contract.service");

module.exports = {
  all: async (req, res, next) => {
    try {
        const data = await all(req.user);
        return res.status(200).json({
            data: data,
            code: 200,
        });
    } catch (err) {
      next(err);
    }
  },
};
