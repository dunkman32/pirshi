import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './pages/main';
import './App.css';
import Naxui from './pages/naxui';
import _404 from './pages/404';
import Single from './pages/single';

const hist = createBrowserHistory();

function App () {
  return (
    <div className="App" style={{ fontFamily: '\'Lobster\', cursive' }}>
      <Router history={hist}>
        <Switch>
          <Route path="/" component={Main} exact/>
          <Route path="/naxui" component={Naxui}/>
          <Route path="/single/:name" component={Single}/>
          <Route component={_404}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
