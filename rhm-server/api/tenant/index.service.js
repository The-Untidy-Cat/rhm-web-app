const sql = require("../../utils/sql");

module.exports = {
  findUser: async (id) => {
    try {
      let result = await sql.query(
        `SELECT ID, NAME, PHONE_NUMBER, EMAIL, ID_NUMBER, HOME_TOWN, DOB FROM TENANT WHERE id = :id`,
        { id: id }
      );
      if (!result.rows.length) return null;
      return {
        _id: result.rows[0][0],
        name: result.rows[0][1],
        phoneNumber: result.rows[0][2],
        email: result.rows[0][3],
        idNumber: result.rows[0][4],
        homeTown: result.rows[0][5],
        dob: result.rows[0][6]
      };
    } catch (e) {
      throw new Error(e);
    }
  },
};
