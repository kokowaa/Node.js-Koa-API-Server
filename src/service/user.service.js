/**
 * 用户操作数据库相关
 */
const connection = require("../app/database");

class UserService {
  // 创建用户
  async create(user) {
    // 将用户存储到数据库中
    const { name, password } = user;
    // console.log('数据：',user);
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`;
    const result = await connection.execute(statement, [name, password]);
    return result[0];
  }

  // 查询用户是否存在
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }

  async uploadAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new UserService();
