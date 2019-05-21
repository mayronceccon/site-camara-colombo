import React, { Component } from 'react';
import api from '../services/api';

class VereadoresSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      vereador: [],
    };
  }

  componentDidMount() {
    this.carregarVereadores();    
  }

  carregarVereadores = async () => {
    const { id } = this.props.match.params
    await api.get(`/vereadores/${id}`).then(response => {
      console.log(response.data);
      this.setState({
        isLoaded: true,
        vereador: response.data,
      });
    }).catch(error => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  };

  render() {
    return (
      <div>
        <h1>Vereador</h1>
        {this.state.vereador.nome}
      </div>
    );
  }
}

export default VereadoresSingle;