/**
 * 处理错误信息
 */
const errorType = require("../constants/error-type");
const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bed Request
      message = "用户名或密码不能为空";
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409; // Conflict 冲突
      message = "用户名已存在";
      break;
    case errorType.USER_NOT_EXIST:
      status = 400; // Bed Request
      message = "用户名不存在";
      break;
    case errorType.PASSWORD_IS_INACCURACY:
      status = 400; // Bed Request
      message = "密码错误";
      break;
    case errorType.UNAUTHORIZATION:
      status = 401; // unauthorized
      message = "无效授权";
      break;
    case errorType.UNPERMISSION:
      status = 401; // unauthorized
      message = "不具备操作权限";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
