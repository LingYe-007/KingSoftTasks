import * as React from "react";
import style from "./style.module.scss";
import Checkbox from "../Checkbox";
import { ICart } from "../../types";

interface Props {
  cart: ICart;
  onSelect: () => void;
  onDelete: () => void;
}

export default function CartItem(props: Props) {
  return (
    <div className={style.Item}>
      <div className={style.ItemContent}>
        <Checkbox
          value={props.cart.selected}
          className={style.CartCheckbox}
          onChange={props.onSelect}
        />
         <img src={props.cart.cover}  alt=""/>
        <div className={style.ItemText}>
          <div className={style.ItemTitle}>{props.cart.title}</div>
          <div className={style.ItemPrice}>￥{props.cart.price}</div>
        </div>
      </div>
    </div>
  );
}
