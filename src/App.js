import React, { Component } from 'react';
import './App.css';
import MenuBar from './components/MenuBar';

import { 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom'

import Home from './pages/Home';
import Pautas from './pages/Pautas';
import Vereadores from './pages/Vereadores';
import ProjetosLei from './pages/ProjetosLei';
import VereadoresSingle from './pages/VereadoresSingle';
import Sobre from './pages/Sobre';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar></MenuBar>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/pautas" component={Pautas}/>
          <Route exact path="/vereadores" component={Vereadores}/>
          <Route exact path="/projetos" component={ProjetosLei}/>
          <Route exact path="/sobre" component={Sobre}/>
          <Route path="/vereadores/:id" component={VereadoresSingle}/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
