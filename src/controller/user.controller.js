/**
 * 用户相关控制
 */
const fs = require('fs');
const service = require("../service/user.service");
const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  async create(ctx, next) {
    // 获取用户传过来的参数
    const user = ctx.request.body;
    // 查询数据库
    let result = await service.create(user);
    // 返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    // 1.拿数据
    const { userId } = ctx.params;
    const avatarInfo = await service.getAvatarByUserId(userId);
    // 2.提供图像信息
    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.fileName}`);
  }
}

module.exports = new UserController();
