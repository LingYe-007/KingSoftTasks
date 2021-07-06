// 文章详情页面
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as api from "../../services/api";
import { IArticle } from "../../types";
import icon_back from "../../assets/imgs/icon_back.png";
import user from "../../assets/imgs/user.png";
import "./style.css";

interface Params {
  id: string;
}

type Props = RouteComponentProps<Params>;

export interface State {
  data: IArticle;
}

class Detail extends React.Component<Props, State> {
  state: State = {
    data: {
      id: "",
      title: "",
      time: "",
      avatar: "",
      author: "",
      banner: "",
      likes: 0,
      comments: 0,
      content: "",
    },
  };
  update() {
    let id = this.props.match.params.id;
    this.props.history.push("/detail/" + id);
  }
  goBack() {
    this.props.history.go(-1);
  }
  async load() {
    let data = (await api.detail(this.props.match.params.id)).data;
    this.setState({
      data: data,
    });
  }
  componentDidMount() {
    this.load();
  }
  render() {
    return (
      <React.Fragment>
        <header className="header">
          <img src={icon_back} onClick={this.goBack.bind(this)}></img>
          <img src={this.state.data.avatar || user}></img>
          <p>{this.state.data.author || ""}</p>
        </header>
        <main className="main">
          <div
            className="banner"
            style={{ background: `url(${this.state.data.banner})` }}
          ></div>
          <div className="content-item">
            <div className="title">{this.state.data.title}</div>
            <div className="time">{this.state.data.time || "Loading"}</div>
            <article
              dangerouslySetInnerHTML={{ __html: this.state.data.content }}
            />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Detail;
