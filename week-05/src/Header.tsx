import playItem from "./PlayItem"

export default class Head extends React.Component {
    async showMenu(){
        this.setState({
            overShow:!this.state.overShow
        })
    }
    state={
            overShow:false
    }
    render() {
        return (
        <header>
            <div className="overhead">
                 <img id='menu' className="img" src="./imgs/icon-menu.svg" alt="" onClick={this.showMenu.bind(this)}/>
                 <img src="./imgs/logo-black.svg" alt="" />
                 <div>Sign in</div>
                 <div  className="add-div">Sign up</div>
                 <span className="add-span" >Inspiration</span>
                 <span className="add-span" >Find Work</span>
                 <span className="add-span" >Learn</span>
                 <span className="add-span" >Go Pro</span>
                 <span className="add-span" >Hire desginers</span>
            </div>
            <div className="over" style={{display:(this.state.overShow)? "block":"none"}}>
                <div className="search-nav">
                Search
                </div>
                <span>Inspiration</span>
                <span>Fire Work</span>
                <span>Learn Design</span>
                <span>Go Pro</span>
                <span>Hire desginers</span>
            </div>
            <div className="background">
                <img src="./imgs/banner.webp" alt=""/>
               <div className="text-content">
                   <h1>Discover the world's top desiginers & creatives</h1>
                   <p>Dribbble is the leading destination to find & showcase creative work and home to the world's best design professionals.</p>
                   <a href="">Sign up</a>
              </div>
            </div>
        </header>
        )
    }
}