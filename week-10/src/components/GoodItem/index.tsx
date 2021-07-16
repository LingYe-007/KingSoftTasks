import * as React from "react";
import { ISku } from "../../types";

import style from "./style.module.scss";

interface Props {
  sku: ISku;
}

export default function Gooditem(props:Props){
  return(
    <React.Fragment>
      <img src={props.sku.cover} className={style.img} alt=''></img>
        <div className={style.content}>
          <div className={style.title}>{props.sku.title}</div>
          <div className={style.price}>￥{props.sku.price}</div>
        </div>
    </React.Fragment>
  )
}