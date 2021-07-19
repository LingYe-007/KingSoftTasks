export enum SkuStatus {
  /**
   * 正常
   */
  Normal = 1,
  /**
   * 下架
   */
  Offline = 2
}

export interface ISku {
  /**
   * 商品ID
   */
  id?: string
  /**
   * 商品标题
   */
  title: string
  /**
   * 商品库存
   */
  stock: number
  /**
   * 商品加个
   */
  price: number
  /**
   * 封面图
   */
  cover: string
  /**
   * 头图集合
   */
  gallery: string[]
  /**
   * 详情图集合
   */
  detail: string[]
  /**
   * 发布时间
   */
  time: number
  /**
   * 商品状态，1-正常，2-下架
   */
  status: SkuStatus
}

export enum UserRole {
  /**
   * 普通用户
   */
  Common = 1,
  /**
   * 管理员
   */
  Admin = 2
}

export interface IUser {
  /**
   * 用户名
   */
  username: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像地址
   */
  avatar: string
  /**
   * 用户角色
   */
  role?: UserRole
}

export type Pick<T> = {
  [P in keyof T]?: T[P]
}

export interface ICart extends ISku {
  selected?: boolean
}
