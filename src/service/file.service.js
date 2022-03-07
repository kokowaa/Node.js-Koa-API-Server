const connection = require("../app/database");
class FileService {
  // 添加头像图片信息
  async createAvatar(fileName, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (fileName, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      fileName,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }
  // 添加动态图片信息
  async createPictures(fileName, mimetype, size, momentId, userId) {
    const statement = `INSERT INTO pictures (fileName, mimetype, size, moment_id, user_id) VALUES (?,?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      fileName,
      mimetype,
      size,
      momentId,
      userId,
    ]);
    return result;
  }
}

module.exports = new FileService();
