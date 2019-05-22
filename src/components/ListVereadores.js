import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { 
  Card,
  Dimmer, 
  Loader
} from 'semantic-ui-react'
import CardVereador from './CardVereador';
import api from '../services/api';

export default class ListVereadores extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        vereadores: [],
      };
    }
  
    componentDidMount() {
      this.carregarVereadores();      
    }

    carregarVereadores = async () => {
      await api.get('/vereadores/').then(response => {
        this.setState({
          isLoaded: true,
          items: response.data,
          vereadores: response.data.results
        });
      }).catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
    };

    formatData = (data) => (
      <Moment format="DD/MM/YYYY">
        {data}
      </Moment>
    )

    render() {
      const { error, isLoaded, vereadores } = this.state;
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
          <Card.Group centered>
            {vereadores.map(item => (                  
              <Card.Content className="card-vereador" key={item.id}>
                <CardVereador dados={item}></CardVereador>
              </Card.Content>
            ))}
          </Card.Group>
        );
      }
    }
  }