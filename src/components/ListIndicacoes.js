import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { 
  Dimmer,
  Loader,
  Table,
  Menu,
  Icon
} from 'semantic-ui-react'
import api from '../services/api';

const PaginationPrevius = (props) => {
  let item = props.items;
  let isDisabled = false;
  if (item.previous == null) {
    isDisabled = true;
  }
  return (
    <Menu.Item disabled={isDisabled} onClick={() => props.onClick(item.previous)} icon>
      <Icon name='chevron left' />
    </Menu.Item>
  )
}

const PaginationNext = (props) => {
  let item = props.items;
  let isDisabled = false;
  if (item.next == null) {
    isDisabled = true;
  }
  return (
    <Menu.Item disabled={isDisabled} onClick={() => props.onClick(item.next)} icon>
      <Icon name='chevron right' />
    </Menu.Item>
  )
}

export default class ListIndicacoes extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        indicacoes: [],
      };
    }
    
    componentDidMount() {
      this.carregarIndicacoes();      
    }
    
    carregarIndicacoes = async (url, pagination) => {
      if (url === undefined) {
        const { id } = this.props.match.params;
        url = `/indicacoes/?vereador=${id}`;
      }
      await api.get(url).then(response => {
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
                <Table.HeaderCell>Destinatário</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {indicacoes.map(item => (                  
                <Table.Row key={item.id}>
                  <Table.Cell>{item.numero}</Table.Cell>
                  <Table.Cell>{this.formatData(item.pauta.data_sessao)}</Table.Cell>
                  <Table.Cell>{item.assunto}</Table.Cell>
                  <Table.Cell>{item.destinatario.nome}</Table.Cell>
                </Table.Row>              
              ))}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row textAlign='center' verticalAlign='middle'>
                <Table.HeaderCell colSpan='4'>
                  <Menu floated='right' pagination fluid>
                    <PaginationPrevius items={items} onClick={this.carregarIndicacoes}></PaginationPrevius>
                    <PaginationNext items={items} onClick={this.carregarIndicacoes}></PaginationNext>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        );
      }
    }
  }