export const ErrorType = {
  // ******* 业务错误语义 ******* //

  InvalidAccessCode: 'InvalidAccessCode', // 密码无效

  // ******* 客户端错误 ******* //
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  ContentNotFound: 404, // 没找到接口
  MethodNotAllowed: 405, // 不支持
  TooManyRequests: 429,

  // ******* 服务端错误 ******* //
  InternalServerError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
} as const;
/* eslint-enable */

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];

export interface ErrorResponse {
  body: any;
  errorType: ErrorType;
}
