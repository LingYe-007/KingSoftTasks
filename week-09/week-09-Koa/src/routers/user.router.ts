import * as Joi from "joi";
import * as Router from "koa-router";

import * as Token from "../services/token.service";
import * as crypto from "crypto";
import { badParams } from "../stats";
import * as userService from "../services/user.service";

const router = new Router({
  prefix: "/api/user",
});

// 查询所有用户信息
router.get("/", async (ctx) => {
  let result = await userService.list();
  ctx.body = {
    stat: "OK",
    result,
  };
});

// 用户注册
router.post("/", async (ctx) => {
  let schema = Joi.object({
    username: Joi.string().min(4).max(16).required(),
    nickname: Joi.string().min(5).max(14).required(),
    password: Joi.string().min(8).max(25).required(),
  });
  let { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  let result = await userService.add(value);
  if (result) {
    ctx.body = {
      stat: "OK",
      result,
    };
  }
});

// 用户登录
router.post("/login", async (ctx) => {
  if (ctx.headers.cookie != null) {
    let token = ctx.headers.cookie.split("token=")[1];
    let result = await Token.findToken(token);
    if (result) {
      ctx.body = {
        stat: "OK",
        method: "IsToken",
        result,
      };
    }
  } else {
    let schema = Joi.object({
      username: Joi.string().min(4).max(16).required(),
      password: Joi.string().min(8).max(25).required(),
    });
    let { value, error } = schema.validate(ctx.request.body);
    if (error) throw badParams(error.message);
    let result = await userService.query(value.username);
    const hash = crypto.createHash("md5");
    hash.update(value.password);
    let hashPass = hash.digest("hex");
    if (hashPass === result.password) {
      let token = await Token.getToken(result.username);
      let _id = result._id;
      let Result = await Token.addToken({ userId: _id, token: token });
      ctx.cookies.set("token", token);
      if (Result) {
        ctx.body = {
          stat: "OK",
          method: "NoToken",
          token:token,
          result,
        };
      }
    } else {
      ctx.body = {
        stat: "ERROR_PASSWORD",
        result,
      };
    }
  }
});

// 用户注销,退出登录
router.delete("/signout/:username", async (ctx) => {
  let schema = Joi.object({
    username: Joi.string().min(4).max(16).required(),
  });
  let { value, error } = schema.validate(ctx.params);
  if (error) throw badParams(error.message);
  let user = await userService.query(value.username);
  let userId = user._id;
  let delResult = await Token.del(userId);
  if (delResult) {
    ctx.body = {
      stat: "OK",
      delResult,
    };
  } else {
    ctx.body = {
      stat: "OK",
      data: "用户无token信息",
    };
  }
});

// 修改用户信息
router.put("/:username", async (ctx) => {
  let schema = Joi.object({
    username: Joi.string().min(4).max(16).required(),
    nickname: Joi.string().min(5).max(14).required(),
    password: Joi.string().min(8).max(25).required(),
  });
  let { value, error } = schema.validate(ctx.request.body);
  if (error) throw badParams(error.message);
  let result = await userService.update(ctx.params.username, value);
  ctx.body = {
    stat: "OK",
    result,
  };
});

// 删除用户信息
router.delete("/:_id", async (ctx) => {
  let schema = Joi.object({
    _id: Joi.string().length(24).required(),
  });
  let { value, error } = schema.validate(ctx.params);
  if (error) throw badParams(error.message);
  let result = await userService.remove(value._id);
  if (result) {
    ctx.body = {
      stat: "OK",
      result,
    };
  }
});

export default router;
