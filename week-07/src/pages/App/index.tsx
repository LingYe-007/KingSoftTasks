import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import News from '../News/index';
import Posts from '../Posts/index';
import Detail from '../Detail//index';

// 定义路由
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Posts}></Route>
          <Route path="/news" component={News}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
