import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.scss";
import * as api from "../../services/api";
import Toast from "../../components/Toast";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);

  const history = useHistory();

  const handelChangeu = (e: any) => {
    setUsername(e.target.value);
    Disable();
  };

  const handelChangep = (e: any) => {
    setPassword(e.target.value);
    Disable();
  };

  const Disable = () => {
    if (username !== "" && password !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const Userlogin = async () => {
    if (username !== null && password !== null) {
      try {
        let result = await api.login(username, password);
        if (result.stat === "OK") {
          history.push("/me");
        } else {
          Toast.show("用户名或密码不正确");
        }
      } catch (error) {
        console.log("invaild cathe");
      }
    } else {
      Toast.show("请输入账号或密码");
    }
  };

  return (
    <div className={style.page}>
      <div className={style.login}>
        <div className={style.logina}>
          <img
            className={style.loginimg}
            src={
              "https://gw.alicdn.com/tfs/TB1puqzr6MZ7e4jSZFOXXX7epXa-160-160.png"
            }
            alt=""
          />
        </div>
        <input
          type="text"
          value={username}
          className={style.logininput}
          onChange={handelChangeu}
          placeholder="用户名"
        ></input>
        <input
          type="password"
          value={password}
          className={style.logininput}
          onChange={handelChangep}
          placeholder="密 码"
        ></input>
        <button
          disabled={disable}
          onClick={Userlogin}
          className={style.loginbutton}
        >
          登 录
        </button>
      </div>
    </div>
  );
}
