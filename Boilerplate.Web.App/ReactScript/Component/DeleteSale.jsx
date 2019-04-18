import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AddSale from './AddSale';
import { Table, Modal, Button, Checkbox, Icon, Form, Header, Menu, Image, Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import {
    withRouter
} from 'react-router-dom';



export default class DeleteSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: this.props.deletedata.customerId,
            store: this.props.deletedata.storeId,
            product: this.props.deletedata.productId,
            date: this.props.deletedata.dateSold,
            id: this.props.deletedata.id,
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
        this.props.hideLoading();
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
        this.setState({ modalOpen: true });
    successCallback = () => {
        this.setState({
            complete: true
        });
    };

    deletesaleForm = () => {
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
            this.setState({ stoError: false });
            serror = false;
        }
        if (cerror || perror || serror || derror) {
            this.setState({ formError: true });
            return;
        } else {
            this.setState({ formError: false });
            alert("Please Enter All Fields");
        }




        let salesdata = {
            Id: this.state.id,
            CustomerId: this.state.customer,
            StoreId: this.state.store,
            ProductId: this.state.product,
            DateSold: this.state.date
        };


        fetch("/Sales/DeleteSale", {
            method: "POST",
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



  






    render() {


        return (


            <Modal trigger={<Button color='red' onClick={this.handleOpen} ><Icon inverted fitted name='trash'/>DELETE</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon={true}>
                <Modal.Header>Delete Sales </Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                        <p> Are you sure? </p>
                        </Modal.Description>

                        :
                        <div>
                            <p>Sales has been deleted successfully</p>
                        </div>
                    }
                    </Modal.Content>
               
                {!this.state.complete ? 
                    <Modal.Actions>
                        <Button color="black" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button 
                            
                            
                            labelPosition="right"
                            color="red"
                            icon="cross"
                       
                  
                            onClick={() => this.deletesaleForm()}>
                            <Icon inverted fitted name='trash' />Delete
                          
                           
                        </Button>
                    </Modal.Actions>
                   : null}
               


            </Modal>

        )
    }
}
