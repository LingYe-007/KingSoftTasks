// 好文推荐列表项组件
import * as React from 'react'
import {IArticle} from '../../types'
import comment from "../../assets/imgs/comment.png"
import value from "../../assets/imgs/value.png"
import "./style.css"
import { Link } from 'react-router-dom'
// import {hashHistory} from 'react-router-';

export interface Props {
     data:IArticle
}
 
export interface State {
    
}
 
class Postltem extends React.Component<Props, State> {
    render() { 
      let path=`/detail/${this.props.data.id}`
      return (
        <Link to={path}>
        <section>
          <div className="image-block" 
          style={{backgroundImage:`url(${this.props.data.banner})`}}>
          {this.props.children}
          </div>
          <p>{this.props.data.title}</p>
          <div className="comment-like">
                <img src={comment}></img>
                <p>{this.props.data.comments}</p>
                <img src={value}></img>
                <p>{this.props.data.likes}</p>
            </div>
        </section>
        </Link>
      )
      // hashHistory.push(path);
    }
}

export default Postltem