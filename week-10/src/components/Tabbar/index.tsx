import * as React from "react";
import { RouteComponentProps, NavLink, withRouter } from "react-router-dom";
import style from "./style.less";
class Tabbar extends React.Component<RouteComponentProps> {
  render() {
    return (
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
    );
  }
}
export default withRouter(Tabbar);
