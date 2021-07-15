import * as request from './request'
import { ISku, IUser } from '../types'

interface BaseRes {
  stat: string
  message?: string
}

interface LoginRes extends BaseRes {
  token: string
  user: IUser
}

interface SkuList extends BaseRes {
  rows: ISku[]
}

interface SkuInfo extends BaseRes {
  data: ISku
}

interface UserInfo extends BaseRes {
  data: IUser
}

/**
 * 商品列表
 * @returns 
 */
export function listSku() {
  return request.post<SkuList>('/api/sku/list')
}

/**
 * 获取商品详情
 * @param id 商品ID
 * @returns 
 */
export function getSku(id: string) {
  return request.post<SkuInfo>('/api/sku/info', { id })
}

/**
 * 购物车列表
 * @returns 
 */
export function listCart() {
  return request.post<SkuList>('/api/cart/list')
}

/**
 * 添加商品到购物车
 * @param skuId 商品ID
 * @returns 
 */
export function addCart(skuId: string) {
  return request.post<BaseRes>('/api/cart/add', { skuId })
}

/**
 * 删除购物车中的商品
 * @param ids 商品ID数组
 * @returns 
 */
export function removeCart(ids: string[]) {
  return request.post<BaseRes>('/api/cart/remove', { ids })
}

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 * @returns 
 */
export function login(username: string, password: string) {
  return request.post<LoginRes>('/api/user/login', { username, password })
}

/**
 * 注销登录
 * @returns 
 */
export function logout() {
  return request.post<BaseRes>('/api/user/logout')
}

/**
 * 获取当前登录用户信息
 * @returns 
 */
export function userInfo() {
  return request.post<UserInfo>('/api/user/info')
}