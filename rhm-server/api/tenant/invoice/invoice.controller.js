const { checkEmpty } = require("../../../utils");
const jwt = require("../../../utils/jwt/index");
const { all, getOverviewById, getDetailById } = require("./invoice.service");
module.exports = {
    all: async (req, res, next) => {
        try {
            const data = await all(req.user);
            return res.status(200).json({
                code: 200,
                data: data,
            });
        } catch (e) {
            next(e);
        }
    },
    id: async (req, res, next) => {
        try {
            const overview = await getOverviewById(req.params.id);
            const detail = await getDetailById(req.params.id);
            if (!overview) {
                throw new Error("Không tìm thấy hoá đơn");
            }
            return res.status(200).json({
                code: 200,
                data: {
                    overview: overview,
                    detail: detail
                }
            });
        } catch (e) {
            next(e);
        }
    },
}