import * as Joi from "joi";
import { ObjectId } from "mongodb";
import * as Router from "koa-router";
import * as crypto from "crypto";

import { badParams } from "../stats";
import * as albumService from "../services/album.service";

const router = new Router({
  prefix: "/api/album",
});

// 读取所有的Ablum
router.get("/", async (ctx) => {
  let rows = await albumService.list();
  ctx.body = {
    stat: "OK",
    rows,
  };
});

// 查找某一个ablum
router.get("/:_id", async (ctx) => {
  let result = await albumService.findOne(ctx.params._id);
  ctx.body = {
    stat: "OK",
    result,
  };
});

// 创建一个新的ablum
router.post("/", async (ctx) => {
  let schema = Joi.object({
    name: Joi.string().required(),
    singer: Joi.string().required(),
    release_time: Joi.string().required(),
    cover: Joi.string().required(),
    areaId: Joi.string().required()
  });
  let { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  let result = await albumService.add(value);
  ctx.body = {
    stat: "OK",
    result,
  };
});

// 更新albums
router.put("/:_id", async (ctx) => {
  let schema = Joi.object({
    name: Joi.string(),
    areaId: Joi.string(),
    singer: Joi.string(),
    release_time: Joi.string(),
    cover: Joi.string(),
  });
  let { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  await albumService.update(ctx.params._id, value);
});

// 删除ablums
router.delete("/:id", async (ctx) => {
  let result = await albumService.remove(ctx.params._id);
  ctx.body = {
    stat: "OK",
    result
  };
});

export default router;
