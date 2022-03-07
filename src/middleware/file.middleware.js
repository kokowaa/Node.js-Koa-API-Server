const path = require('path');
const Multer = require("koa-multer");
const Jimp = require("jimp");
const { AVATAR_PATH, PICTURES_PATH } = require("../constants/file-path");

// 处理单个头像图片
const avatarMulter = Multer({
  dest: AVATAR_PATH,
});
const avatarHandler = avatarMulter.single("avatar");

// 处理动态图片
const picturesMulter = Multer({
  dest: PICTURES_PATH,
});
const picturesHandler = picturesMulter.array("picture", 9);

// picture重新设置大小
/**
 * 处理图片方法：
 * 1.第三方库：sharp 体积较大
 *        sharp(path).resize()
 * 2.第三方库：jimp 体积小一点
 */
const pictureResize = async (ctx, next) => {
  try {
    // 拿到所有图像
    const files = ctx.req.files;
    // 遍历
    for(let file of files) {
      const fileDest = path.join(file.destination, file.filename);
      Jimp.read(file.path).then((image) => {
        image.resize(1280, Jimp.AUTO).write(`${fileDest}-large`);
        image.resize(640, Jimp.AUTO).write(`${fileDest}-middle`);
        image.resize(320, Jimp.AUTO).write(`${fileDest}-small`);
      })
    }
    await next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  avatarHandler,
  picturesHandler,
  pictureResize
};
