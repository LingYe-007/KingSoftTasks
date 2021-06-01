// 好文精选页面
import * as React from 'react'
import Nav from "../../components/Nav/index"
import NewsItem from "../../components/NewsItem/index"
import * as api from '../../services/api'
import { IArticle } from '../../types'
import "./style.css"

export interface Props {
    
}
 
export interface State {
    new:IArticle[]
}
 
class News extends React.Component<Props, State> {
    state: State = {
        new:[]
      }
    async load() {
    let that=this
        api.news().then(function(value){
            that.setState({
                new:value.rows
            })
        })
      }
    componentDidMount(){
        this.load()
    }
    constructor(props: Props) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return (
        <React.Fragment>
              <Nav></Nav>
        <main>{
            this.state.new.map(
                item=>{
                 return <NewsItem data={item} key={item.id}></NewsItem>
                }
            )
            }
        </main>
        </React.Fragment> 
        );
    }
}
 
export default News;