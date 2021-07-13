import { ObjectId } from "mongodb";
import * as db from "../db";

import { IAlbum } from "../types";
import { stats } from "../stats";

// 查询所有记录
export function list() {
  return db.albumCollection.find().toArray();
}

// 根据名字来查找album
export async function findOne(_id: string) {
  let result = await db.albumCollection.findOne({
    _id: new ObjectId(_id),
  });
  if (result == null) throw stats.ERR_NOT_FOUND;
  return result;
}

// 添加一条ablum记录
export async function add(record: IAlbum) {
  let ablum = await db.albumCollection.findOne({
    name: record.name,
  });
  if (ablum !== null) throw stats.ERR_EXISTS;
  let result = await db.albumCollection.insertOne({
    name: record.name,
    singer: record.singer,
    release_time: record.release_time,
    cover: record.cover,
    areaId: new ObjectId(record.areaId),
  });
  return result.ops[0];
}

// 更新一条记录
export async function update(_id: string, record: IAlbum) {
  // 首先查看是否改记录
  record.areaId = new ObjectId(record.areaId);
  let id = new ObjectId(_id);
  let count = await db.albumCollection.countDocuments({
    name: record.name,
    area: record.areaId,
    singer: record.singer,
    release_time: record.release_time,
    cover: record.cover,
    _id: {
      $ne: id,
    },
  });
  if (count > 0) throw stats.ERR_EXISTS;
  else {
    let result = await db.albumCollection.findOneAndUpdate(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: record,
      }
    );
    if (result === null) throw stats.ERR_NOT_FOUND;
    else return result.value;
  }
}

// 删除一条记录
export async function remove(_id: string) {
  let result = await db.albumCollection.findOneAndDelete({
    _id: new ObjectId(_id),
  });
  if (result.value === null) throw stats.ERR_NOT_FOUND;
  return result.value;
}
