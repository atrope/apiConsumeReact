import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { BrowserRouter,Switch, Route } from 'react-router-dom'
import Navigation from './Navigation.js';
import secondApi from './secondApi.js';
import thirdApi from './thirdApi.js';
import './main.css';

let links = [{"title":'Home',"href":"/"}
            ,{"title":'First Book',"href":"/book/1"}
            ,{"title":'Second Link',"href":"/book/2/Drama"}];

ReactDOM.render((
    <BrowserRouter>
      <div className="site">
        <Navigation links={links}/>
          <div className="container-fluid text-center">
            <Switch>
              <Route exact path='/' component={Home}/>
                <Route exact path='/book/:bookId' component={secondApi}/>
                <Route path='/book/:bookId/:category' component={thirdApi}/>
            </Switch>
          </div>
      </div>
    </BrowserRouter>
  ), document.getElementById('root'))
