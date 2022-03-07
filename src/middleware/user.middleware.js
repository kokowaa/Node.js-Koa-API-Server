/**
 *  user 中间件
 */
const errorTypes = require("../constants/error-type");
const service = require("../service/user.service");
const md5Encrypt = require("../utils/password-handle");

// 验证name,password
const verifyUser = async (ctx, next) => {
  // 拿到用户名和密码
  const { name, password } = ctx.request.body;
  // 判断是否为空 为空返回一个错误信息
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  // 判断本次注册用户名是否存在 result是一个数组
  let result = await service.getUserByName(name);
  console.log(result);
  if (result.length) {
    // 有东西 证明已经被注册
    let error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

// 加密password
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Encrypt(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword
};
