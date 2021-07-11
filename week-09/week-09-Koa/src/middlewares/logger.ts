import * as Koa from 'koa'
import * as dayjs from 'dayjs'
import * as crypto from 'crypto'

/**
 * 日志中间件
 * @param ctx 
 * @param next 
 */
export default async function (ctx: Koa.Context, next: Koa.Next) {
  let start = Date.now()
  await next()
  let requestId = crypto.randomBytes(6).toString('hex')
  ctx.set('X-Request-Id', requestId)
  let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  let info = {
    time,
    method: ctx.method,
    url: ctx.url,
    requestId,
    ip: ctx.request.ip,
    response: Date.now() - start,
    status: ctx.status
  }
  console.log(JSON.stringify(info))
}