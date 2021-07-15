import * as React from "react";
import { RouteComponentProps, Link, withRouter } from "react-router-dom";
import style from "./style.less";
import * as api from "../../services/api";
import Toast from "../../components/Toast";
interface State {
  username: string;
  password: string;
  disable: boolean;
}
class Login extends React.Component<RouteComponentProps & State> {
  state: State = {
    username: "",
    password: "",
    disable: true,
  };
  handelChangeu(e: any) {
    this.setState(
      {
        username: e.target.value,
      },
      () => this.Disable()
    );
  }
  handelChangep(e: any) {
    this.setState(
      {
        password: e.target.value,
      },
      () => this.Disable()
    );
  }
  componentDidMount() {}
  Disable() {
    if (this.state.username != "" && this.state.password != "") {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  }
  async Userlogin() {
    if (this.state.username != null && this.state.password != null) {
      try {
        let result = await api.login(this.state.username, this.state.password);
        if (result.stat === "OK") {
          this.props.history.push("/me");
        } else {
          Toast.show("用户名或密码不正确");
        }
      } catch (error) {
        console.log("invalid cache");
      }
    } else {
      Toast.show("请输入账号或密码！");
    }
  }
  render() {
    return (
      <div className={style.page}>
        <div className={style.login}>
          <a className={style.logina}>
            <img
              className={style.loginimg}
              src={
                "https://gw.alicdn.com/tfs/TB1puqzr6MZ7e4jSZFOXXX7epXa-160-160.png"
              }
            />
          </a>
          <input
            type="text"
            value={this.state.username}
            className={style.logininput}
            onChange={this.handelChangeu.bind(this)}
            placeholder="用户名"
          ></input>
          <input
            type="password"
            value={this.state.password}
            className={style.logininput}
            onChange={this.handelChangep.bind(this)}
            placeholder="密 码"
          ></input>
          <button
            disabled={this.state.disable}
            onClick={this.Userlogin.bind(this)}
            className={style.loginbutton}
          >
            登 录
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
