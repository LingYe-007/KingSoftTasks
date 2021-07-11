export enum Status {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500
}

export class ReqStat {
  stat: string
  msg: string
  statusCode: number

  constructor(stat: string, msg: string, statusCode: number = Status.OK) {
    this.stat = stat
    this.msg = msg
    this.statusCode = statusCode
  }
}

export function badParams(message: string) {
  return new ReqStat('ERR_PARAMS', message, Status.BadRequest)
}

export const stats = {
  ERR_EXISTS: new ReqStat('ERR_EXISTS', '记录已存在'),
  ERR_NOT_FOUND: new ReqStat('ERR_NOT_FOUND', '记录不存在')
}