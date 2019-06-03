import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { 
  Dimmer,
  Loader,
  Table,
} from 'semantic-ui-react'
import api from '../services/api';
import MyPaginacao from '../components/MyPaginacao';

export default class ListIndicacoes extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: null,
        items: [],
        indicacoes: [],
      };
    }
    
    componentDidMount() {
      this.carregarIndicacoes();      
    }
    
    carregarIndicacoes = async (url) => {
      this.setState({
        isLoaded: false,
      })
      
      const { id } = this.props.match.params;
      if (url === undefined && id !== undefined) {
        url = `/indicacoes/?vereador=${id}`;
      }

      if (url === undefined && id === undefined) {
        url = `/indicacoes/`;
      }

      await api.get(url, {
        cache: {
          maxAge: 60 * 60 * 1000, // 60 minutos
          exclude: { query: false }
        }
      }).then(response => {
        this.setState({
          isLoaded: true,
          items: response.data,
          indicacoes: response.data.results
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
      const { error, isLoaded, indicacoes, items } = this.state;
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
          <Table celled textAlign='center' verticalAlign='middle'>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>Número</Table.HeaderCell>
                <Table.HeaderCell>Data da Pauta</Table.HeaderCell>
                <Table.HeaderCell>Assunto</Table.HeaderCell>
                <Table.HeaderCell>Vereador</Table.HeaderCell>
                <Table.HeaderCell>Destinatário</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {indicacoes.map(item => (                  
                <Table.Row key={item.id}>
                  <Table.Cell>{item.numero}</Table.Cell>
                  <Table.Cell>{this.formatData(item.pauta.data_sessao)}</Table.Cell>
                  <Table.Cell>{item.assunto}</Table.Cell>
                  <Table.Cell>{item.vereador.nome}</Table.Cell>
                  <Table.Cell>{item.destinatario.nome}</Table.Cell>
                </Table.Row>              
              ))}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row textAlign='center' verticalAlign='middle'>
                <Table.HeaderCell colSpan='5'>                  
                  <MyPaginacao items={items} onClick={this.carregarIndicacoes}></MyPaginacao>                  
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        );
      }
    }
  }