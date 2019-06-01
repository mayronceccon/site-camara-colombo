import React, { Component } from 'react'
import 'moment-timezone';
import {
  Menu,
  Icon,
} from 'semantic-ui-react'

export default class MyPaginacao extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
    }

    PageDescription = (data) => {
      if (data === null) {
        return <Icon name='ellipsis horizontal' />
      }
      return data;
    }

    PaginationLinks = () => {
      let pages = this.props.items.pages;
      return pages.map(item => (
        <Menu.Item 
          key={item.index} 
          disabled={item.url == null} 
          active={item.is_active} 
          onClick={() => this.props.onClick(item.url)} 
          icon
        >
          { this.PageDescription(item.number) }
        </Menu.Item>
      ));
    }
  
    PaginationPrevius = () => {
      let item = this.props.items;
      let isDisabled = false;
      if (item.previous == null) {
        isDisabled = true;
      }
      return (
        <Menu.Item disabled={isDisabled} onClick={() => this.props.onClick(item.previous)} icon>
          <Icon name='chevron left' />
        </Menu.Item>
      )
    }
    
    PaginationNext = () => {
      let item = this.props.items;
      let isDisabled = false;
      if (item.next == null) {
        isDisabled = true;
      }
      return (
        <Menu.Item disabled={isDisabled} onClick={() => this.props.onClick(item.next)} icon>
          <Icon name='chevron right' />
        </Menu.Item>
      )
    }
  
    render () {
      return (
        <Menu floated='right' pagination fluid>
          { this.PaginationPrevius() }
          { this.PaginationLinks() }
          { this.PaginationNext() }
        </Menu>
      );
    }
}