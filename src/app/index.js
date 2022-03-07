const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const useRoutes = require("../router")

const errorHandler = require("./error-handle");

const app = new Koa();
app.useRoutes = useRoutes;

app.use(bodyParser());
app.useRoutes();

// 错误监听
app.on("error", errorHandler);

// 导出
module.exports = app;
