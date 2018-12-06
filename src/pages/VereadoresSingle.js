import React, { Component } from 'react';

class VereadoresSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(`https://camaracolombo.com.br:5005/vereadores/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    return (
      <div>
        <h1>Vereador</h1>  
      </div>
    );
  }
}

export default VereadoresSingle;