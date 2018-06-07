import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { BrowserRouter,Switch, Route } from 'react-router-dom'
import Navigation from './Navigation.js';
import './main.css';

let links = [{"title":'Home',"href":"/"}
            ,{"title":'First Link',"href":"/teste2"}
            ,{"title":'Second Link',"href":"/teste3"}];

ReactDOM.render((
    <BrowserRouter>
      <div className="site">
        <Navigation links={links}/>
          <div className="container-fluid text-center">
            <Switch>
              <Route exact path='/' component={Home}/>
            </Switch>
          </div>
      </div>
    </BrowserRouter>
  ), document.getElementById('root'))
