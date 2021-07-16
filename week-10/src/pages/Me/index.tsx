import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Tabbar from "../../components/Tabbar";
import style from "./style.module.scss";
import * as api from "../../services/api";
import { IUser } from "../../types";
import Toast from "../../components/Toast";

export default function Me() {
  const [user, setUser] = useState<IUser>({
    username: "",
    nickname: "",
    avatar: "",
    role: 4,
  });
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const Drop = async () => {
    await api.logout();
    history.push("/login");
  };

  useEffect(() => {
    const Login = async () => {
      let result = await api.userInfo();
      if (result.stat === "OK") {
        setUser(result.data);
        setLoading(true);
      } else {
        Toast.show("请先登录!");
        history.push("/login");
      }
    };
    Login();
  }, [history]);

  return (
    <div className={style.page}>
      <div className={style.mine}>
        <img
          src={loading ? user.avatar : ""}
          className={style.mineImg}
          alt=""
        />
        <div className={style.mineUsername}>
          {loading ? user.nickname : null}
        </div>
        <button onClick={Drop} className={style.mineButton}>
          退出登录
        </button>
      </div>
      <Tabbar />
    </div>
  );
}
