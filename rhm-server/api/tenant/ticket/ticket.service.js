const { request } = require("express");
const sql = require("../../../utils/sql");

module.exports = {
  all: async (user) => {
    try {
      const result = await sql.query(
        `SELECT SUPPORT_TICKET.ID, SUPPORT_TICKET.STATUS_ID, SUPPORT_TICKET_STATUS.NAME, SUPPORT_TICKET.INCIDENT_TIME, SUPPORT_TICKET.RECEIVE_TIME, SUPPORT_TICKET.ROOM_ID, SUPPORT_TICKET.DESCRIPTION
            FROM SUPPORT_TICKET JOIN SUPPORT_TICKET_STATUS ON SUPPORT_TICKET.STATUS_ID = SUPPORT_TICKET_STATUS.ID
            JOIN TENANT ON SUPPORT_TICKET.TENANT_ID = TENANT.ID
            WHERE TENANT.ID = :id 
            ORDER BY SUPPORT_TICKET.RECEIVE_TIME DESC`,
        { id: user._id }
      );
      let data = [];
      result.rows.forEach((element) => {
        data.push({
          id: element[0],
          statusId: element[1],
          statusName: element[2],
          incidentTime: element[3],
          receiveTime: element[4],
          roomId: element[5],
          description: element[6],
        });
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },
  getCurrentRoomStayByTenantId: async (user) => {
    try {
      const result = await sql.query(
        `SELECT ROOM.ID FROM 
        TENANT JOIN DETAIL_CONTRACT ON TENANT.ID = DETAIL_CONTRACT.TENANT_ID
        JOIN CONTRACT ON DETAIL_CONTRACT.CONTRACT_ID = CONTRACT.ID
        JOIN ROOM ON CONTRACT.ROOM_ID = ROOM.ID
        WHERE TENANT.ID = :id 
        AND CONTRACT.START_DATE <= TRUNC(SYSDATE)
        AND CONTRACT.END_DATE >= TRUNC(SYSDATE)`,
        { id: user._id }
      );
      if (result.rows[0]) {
        return result.rows[0][0];
      } else return null;
    } catch (e) {
      throw new Error(e);
    }
  },
  newTicket: async (user, data) => {
    try {
      console.debug("newTicket", user, data);
      await sql.query(
        `INSERT INTO SUPPORT_TICKET (INCIDENT_TIME, RECEIVE_TIME, TENANT_ID, ROOM_ID, DESCRIPTION, STATUS_ID)
        VALUES (SYSDATE, SYSDATE, :id, :roomId, :description, 0)`,
        { id: user._id, description: data.description, roomId: data.roomId }
      );
      await sql.query(
        `COMMIT`,
      );
      return true;
    } catch (e) {
      throw new Error(e);
    }
  },
};
