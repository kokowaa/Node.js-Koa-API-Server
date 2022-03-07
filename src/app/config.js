/**
 * dotenv
 *
 * 读取根目录的.env文件 写入全局环境变量中
 */
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const PRIVATE_KEYS = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"));
const PUBLIC_KEYS = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));
// console.log(process.env.APP_PORT);

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PRIVATE_KEY,
} = process.env;

module.exports.PRIVATE_KEYS = PRIVATE_KEYS;
module.exports.PUBLIC_KEYS = PUBLIC_KEYS;

