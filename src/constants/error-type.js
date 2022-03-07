/**
 * error type 
 * 错误类型常量
 */

// name或password是必须的
const NAME_OR_PASSWORD_IS_REQUIRED = 'name_or_password_is_required';

// 用户已存在
const USER_ALREADY_EXISTS = 'user_already_exists';

// 查无此用户
const USER_NOT_EXIST = 'user_not_exist';

// 密码错误inaccuracy
const PASSWORD_IS_INACCURACY = 'password_is_in_accuracy';

// 授权失败或失效
const UNAUTHORIZATION = 'unauthorized';

// 无权限
const UNPERMISSION = 'unpermission';

// 
module.exports = {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_NOT_EXIST,
  PASSWORD_IS_INACCURACY,
  UNAUTHORIZATION,
  UNPERMISSION
}