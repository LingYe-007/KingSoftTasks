import { ObjectId } from "mongodb";
import * as db from "../db";
import * as crypto from 'crypto'

import { IUser } from "../types";
import { stats } from "../stats";
import { abort } from "process";

// 添加用户记录
export async function add(user: IUser) {
  let users = await db.userCollection.findOne({
    username: user.username,
  });
  if (users !== null) throw stats.ERR_EXISTS;
  const hash=crypto.createHash('sha256')
  hash.update(user.password)
  console.log(hash)
  let result = await db.userCollection.insertOne({
    username: users.username,
    nickname: users.nickname,
    password: users.password,
  });
  return result.ops[0];
}

// 删除记录
export async function remove(username: string) {
  let result = await db.userCollection.findOneAndDelete({
    _id: {
      $ne: new ObjectId(username),
    },
  });
  if (result.value === null) throw stats.ERR_NOT_FOUND;
  return result.value;
}

// 根据用户名来查找
export async function query(username: string) {
  let result = await db.userCollection.findOne({
    username: username,
  });
  if (result == null) throw stats.ERR_NOT_FOUND;
  return result;
}

// 修改信息
export async function update(username: string, record: IUser) {
  let count = await db.userCollection.countDocuments({
    username: record.username,
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
}
