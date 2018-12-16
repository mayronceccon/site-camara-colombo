import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { 
  Card,
  Dimmer, 
  Loader
} from 'semantic-ui-react'
import CardVereador from './CardVereador';

export default class ListVereadores extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("https://camaracolombo.com.br:5005/vereadores/")
        .then(res => res.json())
        .then(
          (result) => {
            let vereadores = result.results;
            //localStorage.setItem('vereadores', JSON.stringify(vereadores));
            //let cache = JSON.parse(localStorage.getItem('vereadores'))

            this.setState({
              isLoaded: true,
              items: vereadores
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
          <Card.Group centered>
            {items.map(item => (                  
              <Card.Content className="card-vereador" key={item.id}>
                <CardVereador dados={item}></CardVereador>
              </Card.Content>
            ))}
          </Card.Group>
        );
      }
    }
  }