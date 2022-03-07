/**
 * 文件上传(头像、图片等等)
 */
const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { saveAvatarInfo, savePicturesInfo } =require("../controller/file.controller.js");
const { avatarHandler, picturesHandler, pictureResize } = require("../middleware/file.middleware");

const fileRouter = new Router({ prefix: "/upload" });

fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo);
fileRouter.post("/pictures", verifyAuth, picturesHandler, pictureResize, savePicturesInfo);

module.exports = fileRouter;
