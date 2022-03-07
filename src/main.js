/**
 * coderhub项目入口
 *
 * @author 张林
 * @createTime  2021.11.24
 */

const config = require("./app/config");
const app = require("./app");

app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}启动成功~`);
});
