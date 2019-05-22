import React, { Component } from 'react';
import api from '../services/api';
import CardVereador from '../components/CardVereador';
import { 
  Card,
  Dimmer, 
  Loader
} from 'semantic-ui-react';

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
    await api.get(`/vereadores/${id}/`).then(response => {
      const vereador = response.data;
      this.setState({
        isLoaded: true,
        vereador
      });
    }).catch(error => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  };

  render() {
    const { error, isLoaded, vereador } = this.state;
    if (error) {        
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <Dimmer active>
          <Loader>Carregando Dados...</Loader>
        </Dimmer>
      );
    } else {
      return (
        <Card.Group>
          <Card.Content className="card-vereador" key={vereador.id}>
            <CardVereador dados={vereador} extra={true}></CardVereador>
          </Card.Content>
        </Card.Group>
      );
    }
  }
}

export default VereadoresSingle;