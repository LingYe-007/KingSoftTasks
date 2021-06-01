// 热门资讯页面
import * as React from 'react'
import Nav from '../../components/Nav';
import PostItem from "../../components/PostItem"
import * as api from '../../services/api'
import { IArticle } from '../../types'
import top0 from '../../assets/imgs/rank-top1.png'
import top1 from '../../assets/imgs/rank-top2.png'
import top2 from '../../assets/imgs/rank-top3.png'
import top3 from '../../assets/imgs/rank-top4.png'
import top4 from '../../assets/imgs/rank-top5.png'
import "./style.css"

interface Props{

}

interface State {
    imgList:Array<any>
    posts:IArticle[]
}
 
class Posts extends React.Component<Props, State> {
    state: State = {
        imgList:[top0,top1,top2,top3,top4],
        posts:[]
      }
    async load() {
        let that=this
        api.posts().then(function(value){
            that.setState({
                posts:value.rows
            })
        })
      }
    componentDidMount(){
        this.load()
    }
    constructor(props: Props) {
        super(props);
    }
    render() { 
        return (
            <React.Fragment>
            <Nav></Nav>
            <main>{
                this.state.posts.map(
                    item=>{
                     if(this.state.posts.indexOf(item)<5){
                       return <PostItem data={item} key={item.id}>
                           <img  className="img-top"
                            src={
                               this.state.imgList[`${this.state.posts.indexOf(item)}`]} 
                            alt="" />
                       </PostItem>
                     }
                     else{
                         return <PostItem data={item} key={item.id}>
                      </PostItem>
                     }
                    }
                )
                }
            </main>
            {/* {this.state.new.map(item=>{}) */}
            </React.Fragment>
        )
    }
}
 
export default Posts;