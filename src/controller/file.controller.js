/**
 * file: {
    fieldname: 'avatar',
    originalname: '4.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './uploads/avatar',
    filename: '62a49726fac4df5cb1c6db1fffdfaaa2',
    path: 'uploads\\avatar\\62a49726fac4df5cb1c6db1fffdfaaa2',
    size: 343542
  },
 */

const service = require("../service/file.service");
const userService = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");

class FileController {
  async saveAvatarInfo(ctx, next) {
    // console.log(ctx.req.file);
    // 1.获取图像相关信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;
    // 2.将图像信息保存到数据库中
    const result = await service.createAvatar(filename, mimetype, size, id);
    // 3.将头像地址上传到users表里面
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.uploadAvatarUrlById(avatarUrl, id);
    //
    ctx.body = "用户上传头像成功";
  }

  async savePicturesInfo(ctx, next) {
    // 1.拿数据
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;
    // console.log(files);
    // 2.将文件信息保存到数据库
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await service.createPictures(filename, mimetype, size, momentId, id)
    }
    // 3.返回
    ctx.body = "上传动态成功"
  }
}

module.exports = new FileController();
