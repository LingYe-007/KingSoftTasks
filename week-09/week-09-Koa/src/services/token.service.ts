import { ObjectID, ObjectId } from "mongodb";
import * as db from "../db";
import { stats } from "../stats";
import { IToken } from "../types";

const jwt = require("jsonwebtoken");

const secret = "myToken";

// 加密token
export async function getToken(_id: string) {
  let token = jwt.sign({ _id: _id }, secret, { expiresIn: "1h" });
  return token;
}

// 验证token
export async function verifyToken(token: string) {
  let getToken = jwt.verify(token, secret);
  return getToken;
}

// 根据userId查找token
export async function findTokenByUser(userId: ObjectId) {
  let result = await db.tokenCollection.findOne(
    {
      userId: userId,
    },
    {
      projection: {
        createdAt: 0,
      },
    }
  );
  if (result == null) return null;
  return result;
}

// 根据token查找userId来查找token表
export async function findToken(token: string) {
  let result = await db.tokenCollection.findOne(
    {
      token: token,
    },
    {
      projection: {
        createdAt: 0,
      },
    }
  );
  if (result == null) return null;
  return result;
}

// 添加token记录
export async function addToken(record: IToken) {
  let Token = await db.tokenCollection.findOne(
    {
      userId: record.userId,
    },
    {
      projection: {
        createdAt: 0,
      },
    }
  );
  if (Token !== null) throw stats.ERR_EXISTS;
  let result = await db.tokenCollection.insertOne(record);
  return result.ops[0];
}

// 删除token
export async function del(userID: ObjectId) {
  let result = await db.tokenCollection.findOneAndDelete(
    {
      userId: userID,
    },
    {
      projection: {
        createdAt: 0,
      },
    }
  );
  if (result.value === null) throw stats.ERR_NOT_FOUND;
  return result.value;
}
