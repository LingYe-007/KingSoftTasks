import { styles } from "dom7";
import * as React from "react";
import { ISku } from "../../types";

import style from "./style.less";

interface Props {
  sku: ISku;
}

export default class Gooditem extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <img src={this.props.sku.cover} className={style.img}></img>
        <div className={style.content}>
          <div className={style.title}>{this.props.sku.title}</div>
          <div className={style.price}>￥{this.props.sku.price}</div>
        </div>
      </React.Fragment>
    );
  }
}
