import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
// import {
//   message,
// } from "antd";
import style from "./style.less";
import Tabbar from "../../components/Tabbar";
import * as api from "../../services/api";
import { ISku, SkuStatus } from "../../types";
import Gooditem from "../../components/GoodItem";
interface State {
  visible: boolean;
  keyword: string;
  skus: ISku[];
  current: ISku;
}
export default class Goods extends React.Component<RouteComponentProps, State> {
  state: State = {
    visible: false,
    keyword: "",
    skus: [],
    current: null,
  };
  async getData() {
    try {
      let result = await api.listSku();
      if (result.stat === "OK") {
        this.setState({
          skus: result.rows,
        });
      }
    } catch (error) {
      // message.error("网络错误");
    }
  }
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className={style.page}>
        <div className={style.goods}>
          <div className={style.list}>
            {this.state.skus.map((sku) => (
              <Link
                to={"/detail/" + sku.id}
                className={style.item}
                id={sku.id}
                key={sku.id}
              >
                <Gooditem key={sku.id} sku={sku} />
              </Link>
            ))}
          </div>
        </div>
        <Tabbar />
      </div>
    );
  }
}
