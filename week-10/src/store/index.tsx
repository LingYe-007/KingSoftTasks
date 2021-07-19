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
// Store.avatar = "";
// Store.nickname = "";
// Store.username = "";
// Store.prototype.setUsername = (name: string) => {
//   Store.nickname = name;
// };
// Store.prototype.setUser = (nickname: string, avatar: string) => {
//   Store.nickname = nickname;
//   Store.avatar = avatar;
// };
// function Store() {
//   return makeAutoObservable(Store);
// }

// export default new Store();
