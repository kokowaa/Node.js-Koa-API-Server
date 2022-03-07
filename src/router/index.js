/**
 * 路由入口文件
 * 
 * @description 动态加载router文件夹下的 所有的路由组件 
 */
const fs = require("fs");

// 隐式绑定this为app
const useRoutes = function() {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const router = require(`./${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  });
};

module.exports = useRoutes;
