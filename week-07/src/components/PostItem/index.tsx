// 好文推荐列表项组件
import * as React from 'react';
import { IArticle } from '../../types';
import './style.css';
import { Link } from 'react-router-dom';
// import {hashHistory} from 'react-router-';

export interface Props {
  data: IArticle;
  imgSrc?: any;
}

class Postltem extends React.Component<Props> {
  render() {
    let path = `/detail/${this.props.data.id}`;
    return (
      <Link to={path}>
        <section>
          <div
            className="image-block"
            style={{ backgroundImage: `url(${this.props.data.banner})` }}
          >
            {this.props.imgSrc}
          </div>
          <p>{this.props.data.title}</p>
          <div className="comment-like">
            <i className="iconfont icon-comments" />
            <p>{this.props.data.comments}</p>
            <i className="iconfont icon-likes" />
            <p>{this.props.data.likes}</p>
          </div>
        </section>
      </Link>
    );
    // hashHistory.push(path);
  }
}

export default Postltem;
