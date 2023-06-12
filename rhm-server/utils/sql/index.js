require("dotenv").config();
var oracledb = require("oracledb");

var DB_USER = process.env.DB_USER || "root";
var DB_PASSWORD = process.env.DB_PASSWORD || "password";

module.exports = {
  query: (sql, value = {}) => {
    return new Promise(async (resolve, reject) => {
      const connection = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: "localhost:1521/orcl",
      });
      connection.execute(sql, value, { autoCommit: true }, (err, result) => {
        return err ? reject(err) : resolve(JSON.parse(JSON.stringify(result)));
      });
      await connection.close();
    });
  },
};
