import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Tabbar from "../../components/Tabbar";
import style from "./style.less";
import * as api from "../../services/api";
import { IUser } from "../../types";
import Toast from "../../components/Toast";
interface State {
  user: IUser;
  loading: boolean;
}
export default class Me extends React.Component<RouteComponentProps, State> {
  state: State = {
    user: null,
    loading: false,
  };
  // 生命周期函数
  componentDidMount() {
    this.Login();
  }
  // 登陆请求
  async Login() {
    let result = await api.userInfo();
    if (result.stat === "OK") {
      this.setState({
        user: result.data,
        loading: true,
      });
    } else {
      Toast.show("请先登录！");
      this.props.history.push("/login");
    }
  }
  // 退出登录
  async Drop() {
    await api.logout();
    this.props.history.push("/login");
  }
  render() {
    return (
      <div className={style.page}>
        <div className={style.mine}>
          <img
            src={this.state.loading ? this.state.user.avatar : ""}
            className={style.mineImg}
          />
          <div className={style.mineUsername}>
            {this.state.loading ? this.state.user.nickname : null}
          </div>
          <button onClick={this.Drop.bind(this)} className={style.mineButton}>
            退出登录
          </button>
        </div>
        <Tabbar />
      </div>
    );
  }
}
