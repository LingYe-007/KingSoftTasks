import * as React from "react";
import {  NavLink } from "react-router-dom";
import style from "./style.module.scss";

export default function Tabbar(){
  return(
    <div className={style.tab}>
    <NavLink
      to="/"
      exact
      className={style.tabbara}
      activeClassName={style.tabbaraActive}
    >
      <i className="iconfont icon-goods"></i>
      <span>商品</span>
    </NavLink>
    <NavLink
      to="/cart"
      className={style.tabbara}
      activeClassName={style.tabbaraActive}
    >
      <i className="iconfont icon-cart"></i>
      <span>购物车</span>
    </NavLink>
    <NavLink
      to="/me"
      className={style.tabbara}
      activeClassName={style.tabbaraActive}
    >
      <i className="iconfont icon-people"></i>
      <span>个人</span>
    </NavLink>
  </div>
  )
}