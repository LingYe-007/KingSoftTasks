import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./style.css";
import Cart from "../Cart";
import Detail from "../Detail";
import Goods from "../Goods";
import Me from "../Me";
import Login from "../Login";
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Goods} />
          <Route path="/cart" component={Cart} />
          <Route path="/me" component={Me} />
          <Route path="/login" component={Login} />
          <Route path="/detail/:id" component={Detail} />
        </Switch>
      </BrowserRouter>
    );
  }
}
