import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuExampleStackable extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          <img 
            src='/images/brasao.png' 
            alt="Brasão Prefeitura Municipal de Colombo"
          />
        </Menu.Item>

        <Menu.Item
          to='/'
          as={Link}
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        {/* <Menu.Item
          to='/pautas'
          as={Link}
          name='pautas'
          active={activeItem === 'pautas'}
          onClick={this.handleItemClick}
        >
          Pautas
        </Menu.Item> */}

        <Menu.Item 
          to='/sobre'
          as={Link}
          name='sobre' 
          active={activeItem === 'sobre'} 
          onClick={this.handleItemClick}>
          Sobre
        </Menu.Item>
      </Menu>
    )
  }
}