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
        console.log(response);
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
    
    PaginationPrevius = (data) => {
      let item = data.items;
      return (
        <Menu.Item onClick={() => this.carregarIndicacoes(item.previous)} icon>
          <Icon name='chevron left' />
        </Menu.Item>
      )
    }

    formatData = (data) => (
      <Moment format="DD/MM/YYYY">
        {data}
      </Moment>
    )   

    render() {
      const { error, isLoaded, indicacoes, items } = this.state;
      console.log(indicacoes);
      console.log(items);
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
          <Table celled>
            {/* <Table.Header>
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
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4'>
                  <Menu floated='right' pagination fluid>
                  <Menu.Item onClick={() => this.carregarIndicacoes(items.previous)} icon>
                    <Icon name='chevron left' />
                  </Menu.Item>                
                    <Menu.Item onClick={() => this.carregarIndicacoes(items.next)} icon>
                      <Icon name='chevron right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer> */}
          </Table>
        );
      }
    }
  }