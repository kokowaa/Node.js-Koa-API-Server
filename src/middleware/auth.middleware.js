const jwt = require("jsonwebtoken");

const errorTypes = require("../constants/error-type");
const UserService = require("../service/user.service");
const AuthService = require("../service/auth.service");
const md5Encrypt = require("../utils/password-handle");
const { PUBLIC_KEYS } = require("../app/config");

// 验证登录
const verifyLogin = async (ctx, next) => {
  console.log("验证登录的middleware");
  // 拿name,password
  const { name, password } = ctx.request.body;
  // 判断是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  // 判断用户是否存在
  let result = await UserService.getUserByName(name);
  let user = result[0];
  // console.log(user);
  if (!user) {
    // 没有此用户
    let error = new Error(errorTypes.USER_NOT_EXIST);
    return ctx.app.emit("error", error, ctx);
  }
  // 判断密码是否正确(加密)
  if (md5Encrypt(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INACCURACY);
    return ctx.app.emit("error", error, ctx);
  }
  // 全部验证完毕
  ctx.user = user;
  // 返回
  await next();
};

// 验证授权
const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  // 获取token
  const authorization = ctx.headers.authorization;
  // 判断token 有没有传
  // 传递了token - 继续验证
  // 没传token - 返回无效token错误
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // console.log(token);
  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEYS, {
      algorithms: ["RS256"],
    });
    // console.log(result);
    // { id: 5, name: 'linda', iat: 1637852699, exp: 1637939099 }
    ctx.user = result;
    await next();
  } catch (e) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

/**
 * 1.很多业务都需要验证权限的：修改/删除动态，修改/删除评论
 * 2.接口：业务接口系统/后台管理系统
 * 
 * 一对一：user -> role
 * 多对多：role -> menu(删除/修改)
 */
// 验证用户是否具有修改内容的权限
const verifyPermission = async (ctx, next) => {
  // 验证权限的middleware
  // console.log(ctx.request.body);
  // 1.拿参数
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace("Id", "");
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;
  // console.log('验证权限');
  // console.log(id);
  try {
    // 2.查询是否有权限
    const isPermission = await AuthService.checkResource(tableName, resourceId,id);
    // 3.根据结果进行判断执行
    // 预防内容重复 直接抛出一个异常 由下方catch捕获处理即可
    // console.log(isPermission);
    if(!isPermission) throw new Error();
    await next();
  } catch (e) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }
};

/**
 * 思路1：直接使用闭包，使用的时候直接把参数tableName传过来
 */
// const verifyPermission = tableName => {
//   return async (ctx, next) => {
//     // 验证权限的middleware
//     // console.log(ctx.request.body);
//     // 1.拿参数
//     const { momentId } = ctx.params;
//     const { id } = ctx.user;
//     // console.log('验证权限');
//     // console.log(id);
//     try {
//       // 2.查询是否有权限
//       const isPermission = await AuthService.checkResource(tableName,momentId,id);
//       // 3.根据结果进行判断执行
//       // 预防内容重复 直接抛出一个异常 由下方catch捕获处理即可
//       // console.log(isPermission);
//       if(!isPermission) throw new Error();
//       await next();
//     } catch (e) {
//       const error = new Error(errorTypes.UNPERMISSION);
//       return ctx.app.emit('error', error, ctx);
//     }
//   };
// }

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
