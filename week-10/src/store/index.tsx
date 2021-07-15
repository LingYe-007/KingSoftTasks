import { makeAutoObservable } from 'mobx'

class Store {
  username: string = null
  nickname: string = null
  avatar: string = null
  setUsername(name: string) {
    this.username = name
  }
  setUser(nickname:string,avatar:string){
    this.nickname=nickname,
    this.avatar=avatar
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new Store()