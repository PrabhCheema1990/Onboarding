import React, { Component } from 'react';
import { Table, Modal, Button, Checkbox, Icon, Form, Header, Image } from 'semantic-ui-react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AddCustomer from './AddCustomer.jsx';
import AddProduct from './AddProduct.jsx';
import AddStore from './AddStore.jsx';
import AddSale from './AddSale.jsx';
import NavBar from './NavBar';



export default class App extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
            <Router>
                <div className="app">
                        <NavBar />
                        <Route exact path="/" component={AddCustomer} />     
                        <Route exact path="/customer" component={AddCustomer}/>     
                        <Route exact path="/product" component={AddProduct}/>
                        <Route exact path="/sales" component={AddSale}/>
                        <Route exact path="/store" component={AddStore}/>

                        
                </div>
            </Router>
                
                
               

                
                </div>
            
        );
    }
}

        
