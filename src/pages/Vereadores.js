import React, { Component } from 'react';
import ListVereadores from './../components/ListVereadores';

class Vereadores extends Component {
  render() {
    return (
      <div>
        <h1>Vereadores</h1>  
        <ListVereadores></ListVereadores>    
      </div>
    );
  }
}

export default Vereadores;