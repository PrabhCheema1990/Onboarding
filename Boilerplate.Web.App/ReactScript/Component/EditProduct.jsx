import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AddProduct from './AddProduct';
import { Table, Modal,Icon, Button, Checkbox, Form, Header, Menu, Image, Container } from 'semantic-ui-react';
import NavBar from './NavBar';



export default class EditProduct extends Component {
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
        this.editproductForm = this.editproductForm.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }



    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 5000);
      
    }

    handleClose = () => this.setState({ modalOpen: false, complete: false, name: "", price: "" }, () => this.props.loadfun(1))
    handleOpen = () => this.setState({ modalOpen: true })

    editproductForm() {

        let error = false;

        if (this.state.name === '') {
            this.setState({ nameError: true })
            error = true
        } else {
            this.setState({ nameError: false })
            error = false
        }
        if (this.state.price === '') {
            this.setState({ priceError: true })
            error = true
        } else {
            this.setState({ priceError: false })
            error = false
        }

        if (error) {
            this.setState({ formError: true })
            return
        } else {
            this.setState({ formError: false })
        }

        let data = {
            Name: this.state.name,
            Price: this.state.price,
            Id: this.state.id,

            
        }


        fetch("/Products/EditProduct", {
            method: "PUT",
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

            <Modal trigger={<Button color='yellow' onClick={this.handleOpen} ><Icon inverted fitted name='edit' color='black'>EDIT</Icon></Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon={true}>
                <Modal.Header>Edit Product Details</Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <Form error={this.state.formError}>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ name: e.target.value })} label='Name' placeholder="Enter Name..." error={this.state.nameError} value={this.state.name} />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ price: e.target.value })} label='Price' placeholder="Enter Price..." error={this.state.priceError} value={this.state.price} />
                                </Form.Field>

                            </Form>
                        </Modal.Description>

                        :
                        <div className='modal-complete'>

                            <p>Your Data is edited sucessfully</p>
                        </div>
                    }
                </Modal.Content>

                {!this.state.complete ?
                    <Modal.Actions>
                        <Button color='red' onClick={this.handleClose}>Close</Button>
                        <Button positive icon='checkmark' labelPosition='right' content="Submit" onClick={this.editproductForm} />
                    </Modal.Actions>
                    : null}
            </Modal>
        )

    }
}