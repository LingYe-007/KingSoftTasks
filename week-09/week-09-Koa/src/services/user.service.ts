import { ObjectId } from "mongodb";
import * as db from "../db";
import * as crypto from "crypto";

import { IUser } from "../types";
import { stats } from "../stats";
import { any, string } from "joi";

// 所有用户信息
export function list() {
  return db.userCollection
    .find({}, { projection: { password: false } })
    .toArray();
}

// 添加用户记录
export async function add(user: IUser) {
  let users = await db.userCollection.findOne({
    username: user.username,
  });
  if (users !== null) throw stats.ERR_EXISTS;
  const hash = crypto.createHash("md5");
  hash.update(user.password);
  let result = await db.userCollection.insertOne({
    username: user.username,
    nickname: user.nickname,
    password: hash.digest("hex"),
  });
  return result.ops[0];
}

// 删除记录
export async function remove(_id: string) {
  let result = await db.userCollection.findOneAndDelete({
    _id: new ObjectId(_id),
  });
  if (result.value === null) throw stats.ERR_NOT_FOUND;
  return result.value;
}

// 根据用户名来查找
export async function query(username: string) {
  let result = await db.userCollection.findOne(
    {
      username: username,
    }
  );
  if (result == null) throw stats.ERR_NOT_FOUND;
  return result;
}

// 修改信息
export async function update(username: string, record: IUser) {
  const hash = crypto.createHash("md5");
  hash.update(record.password);
  record.password = hash.digest("hex");
  let count = await db.userCollection.countDocuments({
    username: username,
    nickname: record.nickname,
    password: record.password,
  });
  if (count > 0) throw stats.ERR_EXISTS;
  let result = await db.userCollection.findOneAndUpdate(
    {
      username: username,
    },
    {
      $set: record,
    }
  );
  if (result === null) throw stats.ERR_NOT_FOUND;
  return result;
}
