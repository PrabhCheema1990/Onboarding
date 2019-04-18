import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AddProduct from './AddProduct';
import { Table, Modal, Button, Checkbox, Form,Icon, Header, Menu, Image, Container } from 'semantic-ui-react';
import NavBar from './NavBar';



export default class DeleteProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            price: this.props.data.price,
            id: this.props.data.id,

            nameError: false,

            priceError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            complete: false,
            modalOpen: false
        };
        this.deleteproductForm = this.deleteproductForm.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }



    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 5000);
        this.props.hideLoading();
    }
    handleClose = () => this.setState({
        modalOpen: false, complete: false, name: "", price: "" }, () => this.props.loadfun(1))
    handleOpen = () => this.setState({ modalOpen: true })

    deleteproductForm() {

        let nerror = false;
        let perror = false;
        if (this.state.name === "") {
            this.setState({ nameError: true });
            nerror = true;
            alert("Please Enter Name");
        } else {
            this.setState({ nameError: false });
            nerror = false;
        }
        if (this.state.price=== "") {
            this.setState({ priceError: true });
            perror = true;
            alert("Please Enter Price");
        } else {
            this.setState({ Error: false });
            perror = false;
        }
        if (nerror || perror) {
            this.setState({ formError: true });
            return;
        } else {
            this.setState({ formError: false });
        }

        let data = {
            Name: this.state.name,
            Price: this.state.price,
            Id: this.state.id,

            //this.props.createCustomer(customer),
            //this.props.showLoading(),
        }


        fetch("/Products/DeleteProduct", {
            method: "POST",
            headers: {
                Accept: "application/json",

                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(function (body) {
                console.log(body)
            }).then(() => { this.successCallback(); })

    }





    render() {

        return (
            <Modal trigger={<Button color='red' onClick={this.handleOpen} ><Icon inverted fitted name='trash' />DELETE</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon={true}>
                <Modal.Header>Delete Product </Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <p> Are you sure? </p>
                        </Modal.Description>

                        :
                        <div>
                            <p>Product has been deleted successfully</p>
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


                            onClick={() => this.deleteproductForm()}>
                            <Icon inverted fitted name='trash' />Delete


                        </Button>
                    </Modal.Actions>
                    : null}



            </Modal>

        )
    }
}
