import { Hash } from 'crypto'
import { ObjectId } from 'mongodb'

export interface IArea {
  name: string
}

export interface IAlbum {
  areaId: ObjectId
  name: string
  singer: string
  release_time: string
  cover: string
}

export interface IUser{
  // 用户名
  username:string,
  // 昵称
  nickname:string,
  // 密码,需要使用sha1加密
  password:string
}

export interface IToken {
  userId: ObjectId;
  token: string;
}