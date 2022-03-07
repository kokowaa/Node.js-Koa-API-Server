# forzl.cn后台服务器(Node.js)

## 一、项目介绍

### 1.介绍

学习Node.js实战项目，跟随coderwhy(王红元).  

项目为一个博客类产品后台+前台  

### 2.目录结构

```
app - 全局配置信息
controller - 控制器
router - 路由
service - 数据库
utils - 工具函数
main.js 项目主入口文件
```

### 3.使用技术及版本

> "dotenv": "^10.0.0",
>
> "jimp": "^0.16.1",
>
> "jsonwebtoken": "^8.5.1",
>
> "koa": "^2.13.4",
>
> "koa-bodyparser": "^4.3.0",
>
> "koa-multer": "^1.0.2",
>
> "koa-router": "^10.1.1",
>
> "mysql2": "^2.3.3"

## 二、业务接口

### 1.user模块

- 注册用户 POST

```js
{{baseURL}}/user/register
```

- 用户登录 POST

```js
{{baseURL}}/user/login
```

- 获取用户信息 GET

```js
{{baseURL}}/user
```

### 2.moment模块

- 添加moment POST

```js
{{baseURL}}/moment
```

- 获取审核接口 GET

```js
{{baseURL}}/moment/audit
```

- 审核接口 POST

```js
{{baseURL}}/moment/audit/1/1
```

- 获取所有已审核moment的接口 GET

```js
{{baseURL}}/moment
```

### 3.comment模块

- 创建评论 POST

```js
{{baseURL}}/comment
```

### 4.file模块

- 上传头像 POST

```js
{{baseURL}}/upload/avatar
```

- 查看头像 GET

```js
{{baseURL}}/user/zl/avatar
```

- resize POST

```js
{{baseURL}}/user/resize
```

### 5.goods模块

- 新增商品 POST

```js
{{baseURL}}/goods
```

- 查看商品图片 GET

```js
{{baseURL}}/goods/book/[picture-name]
```

- 获取所有商品 GET

```js
{{baseURL}}/goods
```

### 6.order模块

- 新增订单 POST

```js
{{baseURL}}/order
```

