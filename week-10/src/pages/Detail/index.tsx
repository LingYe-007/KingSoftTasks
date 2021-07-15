import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { ISku } from "../../types";
import { SwiperSlide, Swiper } from "swiper/react";
import  Toast from '../../components/Toast'
import * as api from "../../services/api";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import style from "./style.less";

import SwiperCore, { Pagination } from "swiper/core";
import { Result } from "antd";

SwiperCore.use([Pagination]);

interface Params {
  id: string;
}

interface State {
  detail: ISku;
}

type Props = RouteComponentProps<Params>;

export default class Detail extends React.Component<Props, any> {
  state: State = {
    detail: {
      title: null,
      stock: null,
      price: null,
      status: null,
      cover: null,
      gallery: [],
      detail: [],
      time: null,
    },
  };
  goback() {
    this.props.history.push("/");
  }
  async addCart() {
    let result=await api.addCart(this.props.match.params.id);
    if(result.stat==='OK')
    {
      Toast.show("已加入购物车")
    }
    else{
      this.props.history.push("/login");
      Toast.show("请先登录")
    }
  }
  goCart() {
    this.props.history.push("/cart");
  }
  async getData() {
    let result = await api.getSku(this.props.match.params.id);
    if (result.stat == "OK") {
      this.setState({
        detail: result.data,
      });
    }
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className={style.page}>
        <main className={style.main}>
          <div className={style.mainIcon} onClick={this.goback.bind(this)}>
            <i className="iconfont icon-back"></i>
          </div>
          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true, bulletActiveClass: style.dot }}
            className={style.mySwiper}
          >
            {this.state.detail.gallery.map((item) => {
              return (
                <SwiperSlide key={item}>
                  <img src={item} className={style.swiperImg}></img>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className={style.content}>
            <div className={style.price}>￥{this.state.detail.price}</div>
            <div className={style.stock}>库存:{this.state.detail.stock}</div>
            <div className={style.actcle}>{this.state.detail.title}</div>
          </div>
          <div className={style.imgList}>
            {this.state.detail.detail.map((item) => {
              return <img src={item} key={item}/>;
            })}
          </div>
        </main>
        <footer className={style.footer}>
          <Link
            to="/cart"
            className={style.footIcon}
            onClick={this.goCart.bind(this)}
          >
            <i className="iconfont icon-cart"></i>
            <span>购物车</span>
          </Link>
          <button
            className={style.footButton}
            onClick={this.addCart.bind(this)}
          >
            加入购物车
          </button>
        </footer>
      </div>
    );
  }
}
