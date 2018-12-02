import React, { Component } from 'react';
import './App.css';
import MenuBar from './components/MenuBar';

import { 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom'

// import Home from './pages/Home';
import Pautas from './pages/Pautas';
import Vereadores from './pages/Vereadores';
import Sobre from './pages/Sobre';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar></MenuBar>
        <Switch>
          <Route exact path="/" component={Pautas}/>
          <Route path="/pautas" component={Pautas}/>
          <Route path="/vereadores" component={Vereadores}/>
          <Route path="/sobre" component={Sobre}/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
