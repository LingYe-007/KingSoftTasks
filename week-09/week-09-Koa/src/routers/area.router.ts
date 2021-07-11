import * as Joi from 'joi'
import * as crypto from 'crypto'
import * as Router from 'koa-router'

import { badParams } from '../stats'
import * as areaService from '../services/area.service'

const router = new Router({
  prefix: '/api/area'
})

// 读取所有的area
router.get('/', async ctx => {
  let rows = await areaService.list()
  ctx.body = {
    stat: 'OK',
    rows
  }
})

// 查找某一个area
router.get('/:_id', async ctx => {
  let result = await areaService.findOne(ctx.params._id)
  ctx.body = {
    stat: 'OK',
    result
  }
})

// 查找某个area下的所有album
router.get('/:_id/albums', async ctx => {
  let rows = await areaService.listAlbums(ctx.params._id)
  ctx.body = {
    stat: 'OK',
    rows
  }
})

// 创建area
router.post('/', async ctx => {
  let schema = Joi.object({
    name: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let result = await areaService.add(value)
  ctx.body = {
    stat: 'OK',
    result
  }
})

// 修改area
router.put('/:_id', async ctx => {
  let schema = Joi.object({
    name: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  await areaService.update(ctx.params._id, value)
  ctx.body = {
    stat: 'OK'
  }
})

// 删除area
router.delete('/:_id', async ctx => {
  let result = await areaService.remove(ctx.params._id)
  ctx.body = {
    stat: 'OK',
    result
  }
})

// 计算sha1
router.get('/hash/:text', async ctx => {
  let text = ctx.params.text
  let hash = crypto.createHash('sha1')
  hash.update(text)
  let result = hash.digest('hex')
  ctx.body = {
    stat: 'OK',
    result
  }
})

export default router