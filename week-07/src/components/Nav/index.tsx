// 排行榜头部导航组件
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import acticle from '../../assets/imgs/icon_article.webp';
import hot from '../../assets/imgs/icon_hot.webp';
import './style.css';

class Nav extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h5>排行榜</h5>
          <nav>
            <NavLink to="/" className="nav-item" exact activeClassName="nav-active">
              <img src={acticle} alt="" />
              <p>好文精选</p>
            </NavLink>
            <NavLink to="/news" className="nav-item" exact activeClassName="nav-active">
              <img src={hot} alt="" />
              <p>热门资讯</p>
            </NavLink>
          </nav>
        </header>
      </div>
    );
  }
}

export default Nav;
