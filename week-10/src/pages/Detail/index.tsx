import * as React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ISku } from "../../types";
import { SwiperSlide, Swiper } from "swiper/react";
import Toast from "../../components/Toast";
import * as api from "../../services/api";
import { useState, useEffect } from "react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import style from "./style.module.scss";

import SwiperCore, { Pagination } from "swiper/core";

SwiperCore.use([Pagination]);

interface Params {
  id: string;
}

export default function Detail() {
  const [detail, setDetail] = useState<ISku>({
    id: "",
    title: "",
    stock: NaN,
    price: NaN,
    cover: "",
    gallery: [],
    detail: [],
    time: NaN,
    status: 3,
  });
  const history = useHistory();
  const params = useParams<Params>();

  useEffect(() => {
    const getData = async () => {
      let result = await api.getSku(params.id);
      if (result.stat === "OK") {
        setDetail(result.data);
      } else {
        history.push("/login");
        Toast.show("请先登录");
      }
    };
    getData();
  }, [history, params.id]);

  const goback = () => {
    history.push("/");
  };

  const goCart = () => {
    history.push("/cart");
  };

  const addCart = async () => {
    let result = await api.addCart(params.id);
    if (result.stat === "OK") {
      Toast.show("已加入购物车");
    } else {
      history.push("/login");
      Toast.show("请先登录");
    }
  };

  return (
    <div className={style.page}>
      <main className={style.main}>
        <div className={style.mainIcon} onClick={goback}>
          <i className="iconfont icon-back"></i>
        </div>
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true, bulletActiveClass: style.dot }}
          className={style.mySwiper}
        >
          {detail.gallery.map((item) => {
            return (
              <SwiperSlide key={item}>
                <img
                  src={item}
                  className={style.swiperImg}
                  alt="看不见我吗"
                ></img>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={style.content}>
          <div className={style.price}>￥{detail.price}</div>
          <div className={style.stock}>库存:{detail.stock}</div>
          <div className={style.actcle}>{detail.title}</div>
        </div>
        <div className={style.imgList}>
          {detail.detail.map((item) => {
            return <img src={item} key={item} alt="看不见我吗" />;
          })}
        </div>
      </main>
      <footer className={style.footer}>
        <Link to="/cart" className={style.footIcon} onClick={goCart}>
          <i className="iconfont icon-cart"></i>
          <span>购物车</span>
        </Link>
        <button className={style.footButton} onClick={addCart}>
          加入购物车
        </button>
      </footer>
    </div>
  );
}
