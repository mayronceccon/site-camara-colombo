import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { 
  Button,
  List,
  Dimmer, 
  Loader
} from 'semantic-ui-react'
import api from '../services/api';

export default class ListPautas extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      this.carregarDados()
    }

    carregarDados = async () => {
      let url = 'pautas/'
      await api.get(url, {
        cache: {
          maxAge: 60 * 60 * 1000, // 60 minutos
          exclude: { query: false }
        }
      }).then(response => {
        this.setState({
          isLoaded: true,
          items: response.data.results
        });
      }).catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
    }

    formatData = (data) => (
      <Moment format="DD/MM/YYYY">
        {data}
      </Moment>
    )

    render() {
      const { error, isLoaded, items } = this.state;
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
          <List divided relaxed>
            {items.map(item => (
              <List.Item key={item.id}>
                <List.Content floated='right'>
                  <Button target="__blank" href={item.link}>
                    <List.Icon name='download' size='small' verticalAlign='middle' />
                    Baixar
                  </Button>
                </List.Content>
                <List.Icon name='file pdf outline' size='big' verticalAlign='middle' />
                <List.Content verticalAlign='middle'>{item.descricao}</List.Content>
              </List.Item>                  
            ))}
          </List>
        );
      }
    }
  }
