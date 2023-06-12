const sql = require("../../../utils/sql");

module.exports = {
  all: async (user) => {
    try {
      const result = await sql.query(
        `SELECT CONTRACT.ID, CONTRACT.START_DATE, CONTRACT.END_DATE, CONTRACT.PRICE_PER_PERIOD, CONTRACT.DEPOSIT, TENANT2.ID, TENANT2.NAME, CONTRACT.ROOM_ID, ROOM.NAME, CONTRACT_STATUS.NAME
        FROM CONTRACT JOIN CONTRACT_STATUS ON CONTRACT.STATUS_ID = CONTRACT_STATUS.ID
        JOIN ROOM ON CONTRACT.ROOM_ID = ROOM.ID
        JOIN DETAIL_CONTRACT ON CONTRACT.ID = DETAIL_CONTRACT.CONTRACT_ID
        JOIN TENANT TENANT2 ON CONTRACT.TENANT_ID = TENANT2.ID
        JOIN TENANT TENANT1 ON TENANT1.ID = DETAIL_CONTRACT.TENANT_ID
        WHERE TENANT1.ID = :id `,
        { id: user._id }
      );
      let data = [];
      result.rows.forEach((element) => {
        data.push({
            id: element[0],
            startDate: element[1],
            endDate: element[2],
            pricePerPeriod: element[3],
            deposit: element[4],
            representativeId: element[5],
            representativeName: element[6],
            roomId: element[7],
            roomName: element[8],
            statusName: element[9]
        });
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },
};
