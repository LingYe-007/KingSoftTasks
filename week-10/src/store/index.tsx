import { makeAutoObservable } from "mobx";

class Store {
  username: string = "";
  nickname: string = "";
  avatar: string = "";
  setUsername(name: string) {
    this.username = name;
  }
  setUser(nickname: string, avatar: string) {
    this.nickname = nickname;
    this.avatar = avatar;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default new Store();
