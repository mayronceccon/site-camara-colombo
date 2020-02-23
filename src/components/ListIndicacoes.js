import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { 
  Dimmer,
  Loader,
  Table,
  Form,
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
        pesquisarCampo: 'assunto',
        pesquisarValor: '',
        isVereador: false,
      };
    }
    
    componentDidMount() {
      this.carregarIndicacoes();      
    }   

    handleCampos = (event, { name, value }) => {
      this.setState({[name]: value});
    }

    handlePesquisar = (event) => {
      event.preventDefault();
      let campo = this.state.pesquisarCampo;
      let valor = this.state.pesquisarValor;

      // let d = campos.map((k, v) => {
      //   return `${k}=${valor}`;
      // });

      // let u = d.join('&');
      // let url = `/indicacoes/?${u}`;

      let url = `/indicacoes/?${campo}=${valor}`;
      
      this.carregarIndicacoes(url);
    }

    InputGetOption = () => {
      if (this.state.isVereador) {
        let options = [
          { text: 'Assunto', value: 'assunto' },
          { text: 'Destinatário', value: 'destinatario' },
        ]
        return options;
      }
      let options = [
        { text: 'Assunto', value: 'assunto' },
        { text: 'Vereador', value: 'vereador' },
        { text: 'Destinatário', value: 'destinatario' },
      ]
      return options;
    }
    
    InputPesquisar = () => {
      let options = this.InputGetOption();
      
      const {pesquisarValor, pesquisarCampo} = this.state
       
      return (
        <Form onSubmit={this.handlePesquisar}>
          <Form.Group>
            <Form.Input
              name='pesquisarValor'
              placeholder='Pesquisar...'
              value={pesquisarValor}
              onChange={this.handleCampos}
              required
            />
            <Form.Select
              name='pesquisarCampo'
              options={options} 
              value={pesquisarCampo}
              onChange={this.handleCampos}
              required
            />
            <Form.Button content='Pesquisar' />
          </Form.Group>
        </Form>
      )
    }
    
    carregarIndicacoes = async (url) => {
      this.setState({
        isLoaded: false,
      })
      
      const { id } = this.props.match.params;

      if (id !== undefined) {
        this.setState({
          isVereador: true,
        })
      }
      
      if (url === undefined && id !== undefined) {
        url = `/indicacoes/?vereador=${id}`;
      }

      if (url === undefined && id === undefined) {
        url = `/indicacoes/`;
      }
      
      // if (url !== undefined && id !== undefined) {
      //   url = `${url}&vereador=${id}`;
      // }
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

    getVereador = (item) => {
      if (item.vereador === null) {
        return ""
      }
      return item.vereador.nome
    }

    getDestinatario = (item) => {
      if (item.destinatario === null) {
        return ""
      }
      return item.destinatario.nome
    }

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
          <div>
            { this.InputPesquisar() }
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
                    <Table.Cell>{this.getVereador(item)}</Table.Cell>
                    <Table.Cell>{this.getDestinatario(item)}</Table.Cell>
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
          </div>
        );
      }
    }
  }
