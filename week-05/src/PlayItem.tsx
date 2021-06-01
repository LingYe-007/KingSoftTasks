import {Ablum} from "./types"

interface Props{
    Ablum:Ablum
}
export default class PlayItem extends React.Component<Props> {
    render() {
        let {Ablum}= this.props
        return (
          <div className="play-item">
              <div className="play-item1"><img src={Ablum.cover}/></div>
              <div className="play-item2">
                  <div><img src={Ablum.avatar} alt="" /><span>{Ablum.name}</span><ul>{Ablum.badge}</ul></div>
                  <div>
                      <img src="../imgs/icon-like.svg" alt="" width="16"/>{Ablum.likes}
                      <img src="../imgs/icon-view.svg" alt=""  width="16"/>{Ablum.views}
                  </div>
              </div>
          </div>
        )
    }
}