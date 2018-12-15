import React, { Component } from 'react';
import ListProjetosLeis from './../components/ListProjetosLeis';

class ProjetosLei extends Component {
  render() {
    return (
      <div>
        <h1>Projetos</h1>  
        <ListProjetosLeis></ListProjetosLeis>    
      </div>
    );
  }
}

export default ProjetosLei;