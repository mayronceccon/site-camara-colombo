import React, { Component } from 'react';
import MensagemHome from './../components/MensagemHome';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        <MensagemHome>
        </MensagemHome>
      </div>
    );
  }
}

export default Home;