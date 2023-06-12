const { all, getCurrentRoomStayByTenantId, newTicket } = require("./ticket.service");

module.exports = {
    all: async (req, res,next) => {
        try {
            const data = await all(req.user);
            return res.status(200).json({
                data: data,
                code: 200,
            });
        } catch (e) {
            next(e);
        }
    },
    new: async (req, res,next) => {
        try {
            const roomId = await getCurrentRoomStayByTenantId(req.user);
            if (roomId) {
                await newTicket(req.user, { ...req.body, roomId: roomId });
                return res.status(200).json({
                    code: 200,
                    message: "Tạo ticket thành công",
                });
            }
            else {
                throw new Error("Không tìm thấy phòng ở hiện tại");
            }
        } catch (e) {
            next(e);
        }
    }
}