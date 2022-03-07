//
const service = require("../service/label.service");
const verifyLabelExists = async (ctx, next) => {
  // 拿label
  const { labels } = ctx.request.body;

  // 查询label是否存在？不存在则新建
  const newLabels = [];
  for (let name of labels) {
    const labelResult = await service.getLabelByName(name);
    const label = { name };
    if (!labelResult) {
      const result = await service.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  // console.log(newLabels);
  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
};
