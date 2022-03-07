/**
 * 评论模块
 */
const Router = require("koa-router");

const {
  create,
  detail,
  getListMoment,
  update,
  remove,
  addLabels,
  fileInfo
} = require("../controller/moment.controller");
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware")


const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/", getListMoment);
momentRouter.get("/:momentId", detail);

// 1.用户必须登录 2.用户必须具备修改对应权限
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);
// 给动态添加标签
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExists, addLabels);

// 动态配图
momentRouter.get("/images/:filename", fileInfo)

module.exports = momentRouter;
