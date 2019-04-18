import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AddSale from './AddSale';
import { Table, Modal, Button, Checkbox,Icon, Form, Header, Menu, Image, Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import {
    withRouter
} from 'react-router-dom';



export default class EditSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: this.props.editdata.customerId,
            store: this.props.editdata.storeId,
            product: this.props.editdata.productId,
            date: this.props.editdata.dateSold,
            id:this.props.editdata.id,
            custError: false,
            stoError: false,
            proError: false,
            dateError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            complete: false,
            isLoaded: false,
            modalOpen: false,
            salesdata: []
            
        };

    }



    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 5000);
     
    }

    handleClose = () => this.setState({
        modalOpen: false,
        complete: false,
        errorMessage: " ",
        customer: "",
        store: "",
        product: "",
        date: "",


    }, () => this.props.loadfun(1))

    handleOpen = () =>
        this.setState({ modalOpen: true }, () => this.getSalesDetails());
    successCallback = () => {
        this.setState({
            complete: true
        });
    };

   editsaleForm = () => {
        let cerror = false;
        let perror = false;
        let derror = false;
        let serror = false;
        if (this.state.customer === "") {
            this.setState({ custError: true });
            cerror = true;
            alert("Please Select Customer");
        } else {
            this.setState({ custError: false });
            cerror = false;
        }
        if (this.state.product === "") {
            this.setState({ proError: true });
            perror = true;
            alert("Please Select Product");
        } else {
            this.setState({ proError: false });
            perror = false;
        }
        if (this.state.date === "") {
            this.setState({ dateError: true });
            derror = true;
            alert("Please Select Date");
        } else {
            this.setState({ dateError: false });
            derror = false;
        }
        if (this.state.store === "") {
            this.setState({ stoError: true });
            serror = true;
            alert("Please Select Store");
        } else {
            this.setState({ Error: false });
            serror = false;
        }
        if (cerror || perror || serror || derror) {
            this.setState({ formError: true });
            return;
        } else {
            this.setState({ formError: false });
        }




       let salesdata = {
             Id:this.state.id,
            CustomerId: this.state.customer,
            StoreId: this.state.store,
            ProductId: this.state.product,
            DateSold: this.state.date
        };


        fetch("/Sales/EditSale", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",

            },

            body: JSON.stringify(salesdata)
        }).then(res => res.json())
            .then(function (body) {
                console.log(body)
            }).then(() => { this.successCallback(); })

    };



    getSalesDetails = () => {
        fetch("/Sales/GetDropdownJson")
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        salesdata: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                //error => {
                //    this.setState({
                //        isLoaded: true,
                //        error
                //    });
                //}
            );
    };







    render() {


        return (


            <Modal trigger={<Button color='yellow' onClick={this.handleOpen} ><Icon inverted fitted name='edit' color='black'>EDIT</Icon></Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon={true}>
                <Modal.Header>Edit Sales</Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <Form error={this.state.formError}>
                                <Form.Field>
                                    <Form.Input

                                        
                                       label="Date Sold"
                                        value={this.state.date}
                                        placeholder="Date"
                                        type="date"
                                        onChange={e => this.setState({ date: e.target.value })}
                                        
                                    />
                                </Form.Field>
                                <Form.Select
                                    fluid
                                    label="Customer"
                                    search
                                    selection
                                    value={this.state.customer} 
                                    
                                 

                                    options={this.state.salesdata.customer}
                                    
                                    onChange={(e, { value }) => {
                                        this.setState({ customer: value })
                                    }}
                                />
                                <Form.Select
                                    fluid
                                    label="Store"
                                    search
                                    selection
                                    options={this.state.salesdata.store}
                                    
                                    value={this.state.store}
                                    onChange={(e, { value }) => {
                                        this.setState({ store: value })
                                    }}
                                />
                                <Form.Select
                                    fluid
                                    label="Product"
                                    search
                                    selection
                                    value={this.state.product}
                                    options={this.state.salesdata.product}
                                  
                                    onChange={(e, { value }) => {
                                        this.setState({ product: value })
                                    }}
                                />
                            </Form>
                        </Modal.Description>
                        :
                        <div>
                            <p>Sales has been edited successfully</p>
                        </div>
                    }

                </Modal.Content>
                {!this.state.complete ? (
                    <Modal.Actions>
                        <Button color="black" onClick={this.handleClose}>
                            Cancel
              </Button>
                        <Button
                            positive
                            icon="checkmark"
                            labelPosition="right"
                            content="Create"
                            onClick={() => this.editsaleForm()}
                        />
                    </Modal.Actions>
                ) : null}
                {this.state.formError ? (
                    <div>
                        <p>{this.state.errorMessage}</p>
                    </div>
                ) : null}


            </Modal>

        );
    }
}
