import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react'

class Sobre extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <div>
        <h1>Sobre</h1>

        <Accordion fluid styled>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            O que é?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
              App <b>NÃO OFICIAL</b> dos dados da Câmara Municipal de Colombo.
            </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='dropdown' />
            Porquê?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
              Desenvolvido para facilitar a consulta das informações disponibilizadas no site&nbsp;
              <a 
                target="_blank" 
                rel="noopener noreferrer" 
                href="http://camaracolombo.pr.gov.br">
                http://camaracolombo.pr.gov.br
                </a>.
            </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name='dropdown' />
            Responsabilidades
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
              Os dados são de responsabilidade da Câmara de Vereadores da Prefeitura Municipal de Colombo.
            </p>
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}

export default Sobre;