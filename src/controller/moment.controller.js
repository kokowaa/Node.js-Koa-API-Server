//
const fs = require("fs");
const service = require("../service/moment.service");
const { PICTURES_PATH } = require("../constants/file-path");

class MomentController {
  async create(ctx, next) {
    // 1.拿数据(user_id, moment)
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2.将数据插入到数据库
    const result = await service.create(content, userId);

    ctx.body = result;
  }

  async detail(ctx, next) {
    // 1.获取数据(momentId)
    const momentId = ctx.params.momentId;
    // 2.去数据库根据id拿数据
    const result = await service.getMomentById(momentId);
    ctx.body = result;
  }

  async getListMoment(ctx, next) {
    ctx.body = ctx.query;
    // 1.获取参数（offset、size）
    const { offset, size } = ctx.query;
    // 2.根据参数查询数据库
    const result = await service.getMomentList(offset, size);
    ctx.body = result;
  }

  async update(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    // 2.修改内容
    const result = await service.update(content, momentId);
    // console.log(ctx.user);  { id: 5, name: 'linda', iat: 1638183802, exp: 1638270202 }
    // 3.返回结果
    ctx.body = result;
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await service.remove(momentId);
    ctx.body = result;
  }

  async addLabels(ctx, next) {
    // 1.获取标签和动态内容
    const { labels } = ctx;
    console.log(labels);
    const { momentId } = ctx.params;
    // 2.给动态添加标签
    for (let label of labels) {
      // 2.1 判断标签是否已经与动态绑定
      const isExist = await service.hasLabel(momentId, label.id);
      if (!isExist) {
        await service.addLabel(momentId, label.id);
      }
    }

    ctx.body = "添加标签成功~";
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await service.getFileByFilename(filename);
    const { type } = ctx.query;
    const types = ["small", "middle", "large"];
    if(types.some(item => item === type)){
      filename = filename + '-' + type;
    }
    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURES_PATH}/${filename}`);
  }
}

module.exports = new MomentController();
