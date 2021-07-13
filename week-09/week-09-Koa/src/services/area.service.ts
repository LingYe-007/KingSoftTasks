import { ObjectId } from "mongodb";
import * as db from "../db";

import { IArea } from "../types";
import { stats } from "../stats";

// 查询所有记录
export function list() {
  return db.areaCollection.find().toArray();
}

// 根据areaId查询albums列表
export function listAlbums(areaId: string) {
  return db.albumCollection
    .find({
      areaId: new ObjectId(areaId),
    })
    .toArray();
}

// 根据_id查找一条记录
export async function findOne(_id: string) {
  let result = await db.areaCollection.findOne({
    _id: new ObjectId(_id),
  });
  if (result === null) throw stats.ERR_NOT_FOUND;
  return result;
}

// 添加一条记录
export async function add(record: IArea) {
  let area = await db.areaCollection.findOne({
    name: record.name,
  });
  if (area !== null) throw stats.ERR_EXISTS;
  let result = await db.areaCollection.insertOne(record);
  return result.ops[0];
}

// 更新一条记录
export async function update(_id: string, record: IArea) {
  // 先判断是否有同名记录存在
  let count = await db.areaCollection.countDocuments({
    name: record.name,
    _id: {
      $ne: new ObjectId(_id),
    },
  });
  if (count > 0) throw stats.ERR_EXISTS;
  let result = await db.areaCollection.findOneAndUpdate(
    {
      _id: new ObjectId(_id),
    },
    {
      $set: record,
    }
  );
  if (result === null) throw stats.ERR_NOT_FOUND;
}

// 删除一条记录
export async function remove(_id: string) {
  let result = await db.areaCollection.findOneAndDelete({
    _id: new ObjectId(_id),
  });
  if (result.value === null) throw stats.ERR_NOT_FOUND;
  return result.value;
}
