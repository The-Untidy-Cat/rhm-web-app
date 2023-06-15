const { request } = require("express");
const sql = require("../../../utils/sql");

module.exports = {
  all: async (user) => {
    try {
      const result = await sql.query(
        `SELECT INVOICE.ID, INVOICE.STATUS_ID, INVOICE_STATUS.NAME, INVOICE.YEAR, INVOICE.MONTH, INVOICE.TOTAL_MONEY, INVOICE.MONEY_PAID, ROOM.ID, ROOM.NAME
            FROM TENANT JOIN DETAIL_CONTRACT ON TENANT.ID = DETAIL_CONTRACT.TENANT_ID
            JOIN CONTRACT ON DETAIL_CONTRACT.CONTRACT_ID = CONTRACT.ID
            JOIN ROOM ON CONTRACT.ROOM_ID = ROOM.ID
            JOIN INVOICE ON ROOM.ID = INVOICE.ROOM_ID
            JOIN INVOICE_STATUS ON INVOICE.STATUS_ID = INVOICE_STATUS.ID
            WHERE TENANT.ID = :id 
            ORDER BY INVOICE.YEAR DESC, INVOICE.MONTH DESC`,
        { id: user._id }
      );
      let data = [];
      result.rows.forEach((element) => {
        data.push({
          id: element[0],
          statusId: element[1],
          statusName: element[2],
          year: element[3],
          month: element[4],
          totalMoney: element[5],
          moneyPaid: element[6],
          roomId: element[7],
          roomName: element[8]
        });
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },
  getOverviewById: async (id) => {
    try {
      const result = await sql.query(
        `SELECT INVOICE.ID, INVOICE.STATUS_ID, INVOICE_STATUS.NAME, INVOICE.YEAR, INVOICE.MONTH, INVOICE.TOTAL_MONEY, INVOICE.MONEY_PAID, ROOM.ID, ROOM.NAME
            FROM INVOICE
            JOIN INVOICE_STATUS ON INVOICE.STATUS_ID = INVOICE_STATUS.ID
            JOIN ROOM ON ROOM.ID = INVOICE.ROOM_ID
            WHERE INVOICE.ID = :id`,
        { id: id }
      );
    const rows = result.rows;
      let data = {
        id: rows[0][0],
        statusId: rows[0][1],
        statusName: rows[0][2],
        year: rows[0][3],
        month: rows[0][4],
        totalMoney: rows[0][5],
        moneyPaid: rows[0][6],
        roomId: rows[0][7],
        roomName: rows[0][8]
      };
      return data || null;
    } catch (e) {
      throw new Error(e);
    }
  },
  getDetailById: async (id) => {
    try {
      const result = await sql.query(`
      SELECT DETAIL_INVOICE.TYPE_ID, DETAIL_INVOICE_TYPE.NAME, DETAIL_INVOICE_TYPE.UNIT, DETAIL_INVOICE.QUANTITY, DETAIL_INVOICE_TYPE.UNIT_PRICE, DETAIL_INVOICE.SUM_MONEY
      FROM DETAIL_INVOICE JOIN DETAIL_INVOICE_TYPE ON DETAIL_INVOICE.TYPE_ID = DETAIL_INVOICE_TYPE.ID
      WHERE DETAIL_INVOICE.INVOICE_ID = :id`, { id: id });
      let data = [];
      result.rows.forEach((element) => {
        data.push({
          typeId: element[0],
          typeName: element[1],
          unit: element[2],
          quantity: element[3],
          unitPrice: element[4],
          sumMoney: element[5],
        });
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },
};
