import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Tabbar from "../../components/Tabbar";
import style from "./style.less";
import Checkbox from "../../components/Checkbox";
import CartItem from "../../components/CartItem";
import { ICart, ISku } from "../../types";
import * as api from "../../services/api";
import Toast from "../../components/Toast";
interface State {
  carts: ICart[];
  disable: boolean;
  allselect: boolean;
}
export default class Cart extends React.Component<RouteComponentProps, State> {
  state: State = {
    disable: true,
    allselect: false,
    carts: [],
  };
  // 生命周期函数
  componentDidMount() {
    // this.ceshi();
    this.GetGoods();
  }
  // 获取购物车数据
  async GetGoods() {
    let result = await api.listCart();
    if (result.stat === "OK" && result.rows.length != 0) {
      this.setState({
        carts: result.rows,
      });
      this.state.carts.map((cart) => (cart.selected = false));
    }
    if (result.stat === "ERR_NOT_LOGIN") {
      Toast.show("请先登录！", 500);
      this.props.history.push("/login");
    }
  }
  // 点击全选
  SelectAllchange(value: boolean) {
    if (value == false) {
      this.setState({
        allselect: true,
        disable: false,
      });
      this.state.carts.map((cart) => (cart.selected = true));
    } else {
      this.setState({
        allselect: false,
        disable: true,
      });
      this.state.carts.map((cart) => (cart.selected = false));
    }
  }
  // 全选状态判断双向绑定
  AllSelectJudge() {
    let length = this.state.carts.length;
    let selecteddata = this.state.carts.filter((item) => {
      return item.selected == true;
    });
    if (selecteddata.length == length) {
      this.setState({
        allselect: true,
      });
    }
    if (selecteddata.length == 0 || selecteddata.length != length) {
      this.setState({
        allselect: false,
      });
    }
  }
  // 按钮禁用判断
  DisableJudge() {
    let selecteddata = this.state.carts.filter((item) => {
      return item.selected == true;
    });
    if (selecteddata.length != 0) {
      this.setState({
        disable: false,
      });
      return false;
    } else {
      this.setState({
        disable: true,
      });
      return true;
    }
  }
  // 购物车列表项选择状态的变化
  Selectchange(cart: ICart) {
    cart.selected = !cart.selected;
    this.setState({
      carts: this.state.carts,
    });
    this.DisableJudge();
    this.AllSelectJudge();
  }
  // 购物车删除
  async DelectItem() {
    let selecteddata = this.state.carts.filter((item) => {
      return item.selected == true;
    });
    const del = selecteddata.map((item) => item.id);
    let result = await api.removeCart(del);
    if (result.stat === "OK") {
      let newcarts = this.state.carts.filter((item) => {
        return item.selected == false;
      });
      this.setState({
        carts: newcarts,
      });
      this.DisableJudge();
      this.AllSelectJudge();
    }
  }
  render() {
    let content = (
      <div className={style.CartSelect}>
        <Checkbox
          value={this.state.allselect}
          className={style.CartCheckbox}
          onChange={() => {
            this.SelectAllchange(this.state.allselect);
          }}
        />
        <span className={style.CartSpan}>全选</span>
        <button
          disabled={this.state.disable}
          className={style.CartButton}
          onClick={this.DelectItem.bind(this)}
        >
          删除
        </button>
      </div>
    );

    let emptycontent = (
      <div className={style.CartEmpty}>
        {" "}
        <i className="iconfont icon-shop"></i>
        <div>购物车是空的</div>
      </div>
    );
    return this.state.carts.length != 0 ? (
      <div className={style.page}>
        <div className={style.CartList}>
          {this.state.carts.map((cart, i) => (
            <CartItem
              key={i}
              cart={cart}
              onSelect={() => {
                this.Selectchange(cart);
              }}
              onDelete={() => this.DelectItem}
            />
          ))}
        </div>
        {content}
        <Tabbar />
      </div>
    ) : (
      <div className={style.page}>
        {emptycontent}
        <Tabbar />
      </div>
    );
  }
}
