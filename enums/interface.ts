export enum ResultEnum {
  SUCCESS = 200,
  TOKEN_OVERDUE = 403, // 用户登录失败
  INTERNAL_SERVER_ERROR = 500, // 服务异常
}
