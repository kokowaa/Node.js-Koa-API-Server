/**
 * 发布动态moment 数据库处理
 */
const connection = require("../app/database");

// const sqlFragment = `
// SELECT
//   m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
//   JSON_OBJECT("id", u.id, "name", u.name) userInfo
// FROM moment m
// LEFT JOIN users u ON m.user_id = u.id`;

class MomentService {
  // 创建moment
  async create(content, userId) {
    const statement = `INSERT INTO moment (content, user_id) VALUES(?,?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  // 获取单条moment
  async getMomentById(momentId) {
    const statement = `
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
      JSON_OBJECT("id", u.id, "name", u.name, "avatarUrl", u.avatar_url) userInfo,
      IF(COUNT(l.id),JSON_ARRAYAGG(
        JSON_OBJECT("id", l.id, "name", l.name)
      ),NULL) labels,
      (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT("id", c.id, "content", c.content, "commentId", c.comment_id,
        "createTime", c.createAt,
                    "user", JSON_OBJECT("id", cu.id, "name", cu.name, "avatarUrl", cu.avatar_url))
      ) ,NULL) FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
      (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:80/moment/images/",p.fileName)) FROM pictures p WHERE m.id = p.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id;`;
    let [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }

  async getMomentList(offset, size) {
    const statement = `
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
      JSON_OBJECT("id", u.id, "name", u.name) userInfo,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) labelCount,
      (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:80/moment/images/",p.fileName)) FROM pictures p WHERE m.id = p.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?, ?;`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ? ;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ? ;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ? ;`;
    const [result] = await connection.execute(statement, [momentId,labelId]);
    return result[0] ? true : false;
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM pictures WHERE fileName = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new MomentService();
