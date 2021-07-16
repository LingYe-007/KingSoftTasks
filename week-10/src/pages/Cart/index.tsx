import * as React from "react";
import { useHistory } from "react-router-dom";
import Tabbar from "../../components/Tabbar";
import style from "./style.module.scss";
import Checkbox from "../../components/Checkbox";
import CartItem from "../../components/CartItem";
import { ICart } from "../../types";
import { useState, useEffect } from "react";
import * as api from "../../services/api";
import Toast from "../../components/Toast";

export default function Cart() {
  const [disable, setDisable] = useState(true);
  const [allselect, setAllselect] = useState(false);
  const [carts, setCarts] = useState<ICart[]>([]);

  const history = useHistory();

  // 点击全选
  const SelectAllchange = (value: boolean) => {
    if (value === false) {
      setDisable(false);
      setAllselect(true);
      carts.map((cart) => (cart.selected = true));
    } else {
      setAllselect(false);
      setDisable(true);
      carts.map((cart) => (cart.selected = false));
    }
  };

  // 全选状态判断双向绑定
  const AllSelectJudege = () => {
    let length = carts.length;
    let selecteddata = carts.filter((item) => {
      return item.selected === true;
    });
    if (selecteddata.length === length) {
      setAllselect(true);
    }
    if (selecteddata.length === 0 || selecteddata.length !== length) {
      setAllselect(false);
    }
  };

  // 按钮禁用判断
  const DisableJudge = () => {
    let selecteddata = carts.filter((item) => {
      return item.selected === true;
    });
    if (selecteddata.length !== 0) {
      setDisable(false);
      return false;
    } else {
      setDisable(true);
      return true;
    }
  };

  // 购物车列表项状态的变化
  const Selectchange = (cart: ICart) => {
    cart.selected = !cart.selected;
    setCarts(carts);
    DisableJudge();
    AllSelectJudege();
  };

  // 购物车删除
  const DelectItem = async () => {
    let selecteddata = carts.filter((item) => {
      return item.selected === true;
    });
    const del = selecteddata.map((item) => item.id || "");
    let result = await api.removeCart(del);
    if (result.stat === "OK") {
      let newcarts = carts.filter((item) => {
        return item.selected === false;
      });
      setCarts(newcarts);
      DisableJudge();
      AllSelectJudege();
    }
  };

  useEffect(() => {
    const GetGoods = async () => {
      let result = await api.listCart();
      if (result.stat === "OK" && result.rows.length !== 0) {
        setCarts(result.rows);
      }
      if (result.stat === "ERR_NOT_LOGIN") {
        Toast.show("请先登录!", 500);
        history.push("/login");
      }
    };
    GetGoods();
  },[history]);

  let content = (
    <div className={style.CartSelect}>
      <Checkbox
        value={allselect}
        className={style.CartCheckbox}
        onChange={() => {
          SelectAllchange(allselect);
        }}
      />
      <span className={style.CartSpan}>全选</span>
      <button
        disabled={disable}
        className={style.CartButton}
        onClick={DelectItem}
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

  return carts.length !== 0 ? (
    <div className={style.page}>
      <div className={style.CartList}>
        {carts.map((cart, i) => (
          <CartItem
            key={i}
            cart={cart}
            onSelect={() => {
              Selectchange(cart);
            }}
            onDelete={() => DelectItem}
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