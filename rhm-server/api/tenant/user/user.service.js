const sql = require("../../../utils/sql");

module.exports = {
  update: async (user, data) => {
    try {
      await sql.query(
        `UPDATE TENANT
            SET PHONE_NUMBER = :phoneNumber, HOME_TOWN = :homeTown, EMAIL = :email
            WHERE ID = :id`,
        {
          id: user._id,
          phoneNumber: data.phoneNumber,
          homeTown: data.homeTown,
          email: data.email,
        }
      );
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
};
