import * as React from "react";
import style from "./style.less";
interface Props {
  value: boolean;
  className?: string;
  onChange: (value: boolean) => void;
}
export default class Checkbox extends React.Component<Props> {
  className() {
    let name = "iconfont " + style.checkbox;
    if (this.props.value === true)
      name += " icon-roundcheckfill " + style.checked;
    else name += " icon-round";
    if (this.props.className) name += " " + this.props.className;
    return name;
  }
  render() {
    return (
      <i
        className={this.className()}
        onClick={() => this.props.onChange(!this.props.value)}
      />
    );
  }
}
