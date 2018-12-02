import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { Card } from 'semantic-ui-react'
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
          <Card.Group>
            {items.map(item => (                  
              <Card.Content key={item.id}>
                <CardVereador dados={item}></CardVereador>
              </Card.Content>
            ))}
          </Card.Group>
        );
      }
    }
  }