import * as React from "react";
import style from "./style.module.scss";
interface Props {
  value: boolean|undefined;
  className?: string;
  onChange: (value: boolean) => void;
}

export default function Checkbox(props:Props){
  function className(){
    let name = "iconfont " + style.checkbox;
    if (props.value === true)
      name += " icon-roundcheckfill " + style.checked;
    else name += " icon-round";
    if (props.className) name += " " + props.className;
    return name;
  }
  return(
    <i
      className={className()}
      onClick={()=>props.onChange(!props.value)}
      ></i>
  )
}