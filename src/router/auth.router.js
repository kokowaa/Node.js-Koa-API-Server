/**
 * 用户登录授权
 */
const Router = require("koa-router");

const { login, authSuccess } = require("../controller/auth.controller.js");

const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

const authRouter = new Router();

authRouter.post("/login", verifyLogin, login);
authRouter.get('/test', verifyAuth, authSuccess);

module.exports = authRouter;
