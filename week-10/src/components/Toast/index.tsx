import * as React from "react";
import * as ReactDOM from "react-dom";

import style from "./style.less";

export default class Toast extends React.Component {
  static show(text: string, duration = 2000) {
    let el = document.createElement("div");
    document.body.appendChild(el);
    ReactDOM.render(<Toast>{text}</Toast>, el);
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(el);
      document.body.removeChild(el);
    }, duration);
  }

  render() {
    return (
      <div className={style.wrap}>
        <div className={style.box}>{this.props.children}</div>
      </div>
    );
  }
}
