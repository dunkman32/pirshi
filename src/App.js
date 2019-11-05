import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './pages/main';
import './App.css';

const hist = createBrowserHistory();

function App () {
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Route path="/" component={Main} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
