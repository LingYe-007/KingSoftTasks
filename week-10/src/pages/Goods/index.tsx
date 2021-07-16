import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./style.module.scss";
import Tabbar from "../../components/Tabbar";
import * as api from "../../services/api";
import { ISku } from "../../types";
import Gooditem from "../../components/GoodItem";

export default function Goods() {
  const [skus, setSkus] = useState<ISku[]>([]);

  useEffect(() => {
    const getData = async () => {
      let result = await api.listSku();
      if (result.stat === "OK") {
        setSkus(result.rows);
      }
    };
    getData();
  });
  return (
    <div className={style.page}>
      <div className={style.goods}>
        <div className={style.list}>
          {skus.map((sku) => (
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
