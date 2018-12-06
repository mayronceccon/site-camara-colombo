import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { Button, List } from 'semantic-ui-react'

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
      fetch("https://camaracolombo.com.br:5005/pautas/")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.results
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
        return <div>Loading...</div>;
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