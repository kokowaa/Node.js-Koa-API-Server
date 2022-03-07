const connection = require("../app/database");
class AuthService {
  async checkResource(tableName, id, userId) {
    // return false;
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [id, userId]);
    // console.log(result);
    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();
