import React, { Component } from 'react'
import { 
  Table, 
  Dimmer, 
  Loader, 
  Icon, 
} from 'semantic-ui-react'
import api from '../services/api';
import MyPaginacao from '../components/MyPaginacao';

export default class ListProjetosLeis extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        projetos: [],
      };
    }
  
    componentDidMount() {
      this.carregarDados()
    }

    carregarDados = async (url) => {
      this.setState({
        isLoaded: false,
      })

      if (url === undefined) {
        url = `projetos/`;
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
          projetos: response.data.results
        });
      }).catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
    }

    getVereador = (item) => {
      if (item.vereador === null) {
        return ""
      }
      return item.vereador.nome
    }

    statusProjeto = (data) => {
      if (data) {
        return <Icon color='green' name='check' />;
      }
      return <Icon color='red' name='times' />;
    }

    render() {
      const { error, isLoaded, projetos, items } = this.state;
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
          <div>
            <Table celled textAlign='center' verticalAlign='middle'>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>Número</Table.HeaderCell>
                  <Table.HeaderCell>Assunto</Table.HeaderCell>
                  <Table.HeaderCell>Vereador</Table.HeaderCell>
                  <Table.HeaderCell>Aprovado</Table.HeaderCell>
                  <Table.HeaderCell>Arquivado</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {projetos.map(item => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.projeto}</Table.Cell>
                    <Table.Cell textAlign='left'>{item.assunto}</Table.Cell>
                    <Table.Cell>{this.getVereador(item)}</Table.Cell>
                    <Table.Cell>{this.statusProjeto(item.data_aprovacao)}</Table.Cell>
                    <Table.Cell>{this.statusProjeto(item.data_arquivamento)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row textAlign='center' verticalAlign='middle'>
                  <Table.HeaderCell colSpan='5'>
                    <MyPaginacao items={items} onClick={this.carregarDados}></MyPaginacao>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        );
      }
    }
  }
