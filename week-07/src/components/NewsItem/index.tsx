// 热门资讯列表项组件
import * as React from 'react'
import {IArticle} from '../../types'
import { Link } from 'react-router-dom'
import "./style.css"

export interface Props {
     data:IArticle
}
 
export interface State {
    
}
 
class NewsLitem extends React.Component<Props, State> {
    render() { 
      let path=`/detail/${this.props.data.id}`
      return (
        <Link to={path}>
        <section className="section-1">
        <div className="image-block-1" 
        style={{backgroundImage:`url(${this.props.data.banner})`}}>
        </div>
        <div className="content">
          <p>{this.props.data.title}</p>
          <p>{this.props.data.author}</p>
        </div>
      </section>
      </Link>
      )
    }
}
    export default NewsLitem