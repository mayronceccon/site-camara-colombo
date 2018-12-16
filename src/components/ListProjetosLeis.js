import React, { Component } from 'react'
import { 
  Table, 
  Dimmer, 
  Loader, 
  Icon, 
  Pagination 
} from 'semantic-ui-react'
import _ from 'lodash'


function statusProjeto(data) {
  if (data) {
    return <Icon color='green' name='check' />;
  }
  return <Icon color='red' name='times' />;
}

export default class ListProjetosLeis extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        paginatedItems: [],
        column: null,
        direction: null,
        limit: 25,
        paginas: null,
        paginaAtiva: 1,
        filtro: false,
      };
    }

    handleSort = clickedColumn => () => {
      const { column, items, direction } = this.state
  
      if (column !== clickedColumn) {
        let data = _.sortBy(items, [clickedColumn]);
        this.setState({
          column: clickedColumn,
          items: data,
          direction: 'ascending',
        });

        this.getPaginatedItems(data);
  
        return
      }
      let data = items.reverse();
      this.setState({
        items: data,
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
      this.getPaginatedItems(data);
    }

    filterList = (event) => {
      let updatedList = this.state.items;
      updatedList = updatedList.filter(function(item){
        return item.assunto.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1;
      });
      this.setState({
        filtro: true,
      })

      this.getPaginatedItems(updatedList);
    }
  
    componentDidMount() {
      fetch("https://camaracolombo.com.br:5005/projetos_lei/")
        .then(res => res.json())
        .then(
          (result) => {
            let items = result.results;
            this.getPaginatedItems(items);
            this.setState({
              isLoaded: true,
              items: items,
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    handlePageClick = (event, data) => {
      let page = data.activePage;
      let dados = this.state.items;
      // if (this.state.filtro) {
      //   dados = this.state.
      // }
      this.getPaginatedItems(dados, page);
    };

    getPaginatedItems = (items, page) => {
      page = page || 1;
      let limit = this.state.limit;
      let offset = (page - 1) * limit;
      let paginatedItems = _(items)
                .drop(offset)
                .take(limit)
                .value();

      this.setState({
        paginas: Math.ceil(items.length / limit),
        paginatedItems: paginatedItems,
        paginaAtiva: page,
      });
    }

    render() {
      const { error, isLoaded, paginatedItems, column, direction } = this.state;
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
            {/* <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Pesquisa' placeholder='Pesquisa' onChange={e => this.filterList(e)} />
              </Form.Group>
            </Form> */}
            <Table striped sortable celled fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell 
                    textAlign='center'
                    sorted={column === 'projeto' ? direction : null}
                    onClick={this.handleSort('projeto')}
                  >Nº</Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'assunto' ? direction : null}
                    onClick={this.handleSort('assunto')}
                  >Assunto</Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'vereador.nome' ? direction : null}
                    onClick={this.handleSort('vereador.nome')}
                  >Vereador</Table.HeaderCell>
                  <Table.HeaderCell 
                    textAlign='center'
                    sorted={column === 'data_aprovacao' ? direction : null}
                    onClick={this.handleSort('data_aprovacao')}
                  >Aprovado</Table.HeaderCell>
                  <Table.HeaderCell 
                    textAlign='center'
                    sorted={column === 'data_arquivamento' ? direction : null}
                    onClick={this.handleSort('data_arquivamento')}
                  >Arquivado</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {_.map(paginatedItems, ({projeto, assunto, vereador, data_aprovacao, data_arquivamento}) => (
                  <Table.Row key={projeto}>
                    <Table.Cell textAlign='center'>{projeto}</Table.Cell>
                    <Table.Cell>{assunto}</Table.Cell>
                    <Table.Cell>{vereador.nome} ({vereador.apelino})</Table.Cell>
                    <Table.Cell textAlign='center'>{statusProjeto(data_aprovacao)}</Table.Cell>
                    <Table.Cell textAlign='center'>{statusProjeto(data_arquivamento)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div className="centered">
              <Pagination 
                defaultActivePage={1}
                totalPages={this.state.paginas} 
                onPageChange={this.handlePageClick}
                siblingRange={1}
                boundaryRange={0}
                ellipsisItem={null}
              />
            </div>
          </div>
        );
      }
    }
  }