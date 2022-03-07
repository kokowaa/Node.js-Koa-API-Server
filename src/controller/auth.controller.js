/**
 * 登录
 */
const jwt = require("jsonwebtoken");
const { PRIVATE_KEYS } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    // 拿name,password
    const { id, name } = ctx.user;
    // jwt加密颁发token
    const token = jwt.sign({ id, name }, PRIVATE_KEYS, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    // 数据库查询校验

    // 返回或next()
    ctx.body = { id, name, token };
  }

  //
  async authSuccess(ctx, next) {
    ctx.body = "授权成功";
  }
}

module.exports = new AuthController();
