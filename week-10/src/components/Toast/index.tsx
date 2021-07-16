import * as React from "react";
import * as ReactDOM from "react-dom";

import style from "./style.module.scss";


Toast.show = (text: string, duration = 2000) => {
  let el = document.createElement("div");
  document.body.appendChild(el);
  ReactDOM.render(<Toast>{text}</Toast>, el);
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(el);
    document.body.removeChild(el);
  }, duration);
};

export default function Toast(props: any) {
  return (
    <div className={style.wrap}>
      <div className={style.box}>{props.children}</div>
    </div>
  );
}
