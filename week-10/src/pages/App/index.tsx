import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./style.css";
import Cart from "../Cart";
import Detail from "../Detail";
import Goods from "../Goods";
import Me from "../Me";
import Login from "../Login";

export default function App(){
    return(
      <BrowserRouter>
        <switch>
          <Route path='/' exact component={Goods}></Route>
          <Route path='/cart' component={Cart}></Route>
          <Route path='/me' component={Me}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
        </switch>
      </BrowserRouter>
    )
}