import * as Koa from 'koa'
import * as koaBody from 'koa-body'

import logger from './middlewares/logger'
import router from './router'
import * as db from './db'
import { ReqStat } from './stats'

const app = new Koa()
app.use(async (ctx, next) => {
  try {
    let start = Date.now()
    await next()
    let time = Date.now() - start
    ctx.set('X-Response-Time', time + 'ms')
  } catch (error) {
    if (error instanceof ReqStat) {
      ctx.status = error.statusCode || 500
      ctx.body = {
        stat: error.stat,
        message: error.msg
      }
    }
  }
})
app.use(logger)
app.use(koaBody())
app.use(router.routes())
db.connect().then(() => app.listen(3000))