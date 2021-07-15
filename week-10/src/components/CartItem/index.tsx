import * as React from "react";
import { RouteComponentProps, NavLink, withRouter } from "react-router-dom";
import style from "./style.less";
import Checkbox from "../Checkbox";
import { ICart } from "../../types";
interface Props {
  cart: ICart;
  onSelect: () => void;
  onDelete: () => void;
}
export default class CartItem extends React.Component<Props> {
  render() {
    return (
      <div className={style.Item}>
        <div className={style.ItemContent}>
          <Checkbox
            value={this.props.cart.selected}
            className={style.CartCheckbox}
            onChange={this.props.onSelect}
          />
          <img src={this.props.cart.cover} />
          <div className={style.ItemText}>
            <div className={style.ItemTitle}>{this.props.cart.title}</div>
            <div className={style.ItemPrice}>￥{this.props.cart.price}</div>
          </div>
        </div>
      </div>
    );
  }
}
