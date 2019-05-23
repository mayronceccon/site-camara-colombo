import React, { Component } from 'react';
import ListIndicacoes from './../components/ListIndicacoes';

class Indicacoes extends Component {
  render() {
    return (
      <div>
        <h1>Indicações</h1>  
        <ListIndicacoes {...this.props}></ListIndicacoes>    
      </div>
    );
  }
}

export default Indicacoes;