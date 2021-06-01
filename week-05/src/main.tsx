import Head from "./Header.js"
import PlayItem from "./PlayItem.js"
import * as request from "./request.js"
import {Ablum} from "./types.js"

interface State{
  Ablums:Ablum[]
}

class App extends React.Component<any,State> {
  
  state:State={ 
    Ablums:[]
  }

  async getData(){
    let Ablums = await request.get<Ablum[]>("../data/task.json")
    this.setState({
      Ablums
    })
  }

  componentDidMount(){
    this.getData()
  }

  render() {
    return  <React.Fragment>
       <Head/>
       <main>
          <div className="container" >
            {this.state.Ablums.map((Ablum,index) => <PlayItem key={index} Ablum={Ablum}/>)}
          </div>
       </main>
       <footer>
       <img src="imgs/logo-red.svg" />
        <div>Dribbble is the world's leading<br/> community for creatives to share,grow,<br/>and get hired.
        </div>
       </footer>
    </React.Fragment> 
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))