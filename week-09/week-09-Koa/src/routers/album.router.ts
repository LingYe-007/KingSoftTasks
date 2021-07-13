import * as Joi from "joi";
import * as Router from "koa-router";

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
    name: Joi.string().min(2).max(10).required(),
    singer: Joi.string().min(2).max(16).required(),
    release_time: Joi.string().min(4).max(50).required(),
    cover: Joi.string().min(10).max(30).required(),
    areaId: Joi.string().length(24).required()
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
    name: Joi.string().min(2).max(10),
    areaId: Joi.string().length(24),
    singer: Joi.string().min(2).max(16),
    release_time: Joi.string().min(4).max(50),
    cover: Joi.string().min(4).max(30),
  });
  let { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  let result = await albumService.update(ctx.params._id, value);
  if(result){
    ctx.body={
      stat:"OK",
      result
    }
  }
});

// 删除ablums
router.delete("/:_id", async (ctx) => {
  let result = await albumService.remove(ctx.params._id);
  ctx.body = {
    stat: "OK",
    result
  };
});

export default router;
