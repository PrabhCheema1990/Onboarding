
import { Menu } from 'semantic-ui-react'
import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';


export default class NavBar extends React.Component {
  state = {}
  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
        <Menu fluid widths={4} inverted color='black'>
            <Menu.Item inverted
            color='green'
          as={Link} to='customer'
          name='customer'
          active={activeItem === 'customer'}
          onClick={this.handleItemClick}
        ><h3>Customers</h3>
          
        </Menu.Item>
            <Menu.Item inverted
          color='green'
          as={Link} to='product'
          name='product'
          active={activeItem === 'product'}
          onClick={this.handleItemClick}
        ><h3>Products</h3>
          
        </Menu.Item>
       
        
          <Menu.Item inverted
              as={Link} to='store'
              color='green'
              name='store'
              active={activeItem === 'store'}
              onClick={this.handleItemClick}
          ><h3>Stores</h3>
                     
        </Menu.Item>
            <Menu.Item inverted
                color='green'
                as={Link} to='sales'
                name='sales'
                active={activeItem === 'sales'}
                onClick={this.handleItemClick}
            ><h3>Sales</h3>
                    
        </Menu.Item>
      </Menu >
    )
  }
}