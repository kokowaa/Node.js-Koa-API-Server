/**
 * password加密
 */
// Node.js自带库 crypto
const crypto = require("crypto");

const md5Encrypt = (password) => {
  const md5 = crypto.createHash("md5");
  let result = md5.update(password).digest("hex");
  return result;
};

module.exports = md5Encrypt;
