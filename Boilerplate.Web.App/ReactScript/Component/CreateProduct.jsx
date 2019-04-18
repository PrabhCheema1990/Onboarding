import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Modal, Button, Checkbox, Form, Header, Menu, Image, Container } from 'semantic-ui-react';



export default class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            price:'',

            nameError: false,

            priceError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            complete: false,
            modalOpen: false
        };
        this.createproductForm = this.createproductForm.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }



    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 5000);
        this.props.hideLoading();
    }

    handleClose = () => this.setState({ modalOpen: false, complete: false, name: "", price: "", errorMessage: "  "}, () => this.props.loadfun(1))
    handleOpen = () => this.setState({ modalOpen: true })

    createproductForm() {

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
        if (this.state.price === "") {
            this.setState({ priceError: true });
            perror = true;
            alert("Please Enter Price");
        } else {
            this.setState({ priceError: false });
            perror = false;
        }
        if (nerror || perror) {
            this.setState({ formError: true });
            return;
        } else {
            this.setState({ formError: false });
        }
        let productdata = {
            Name: this.state.name,
            Price: this.state.price,

            
        }


        fetch("/Products/Create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
               
                //success: function (data, status, xhr) {
                //    alert('Success!');
                //},
                //error: function (xhr, status, error) {
                //    alert('Error occurred - ' + error);
                //}
            },
            body: JSON.stringify(productdata)
        }).then(res => res.json())
            .then(function (body) {
                console.log(body)
            }).then(() => { this.successCallback(); })

    }







    render() {

        return (

            <Modal trigger={< Button size='big' active color='blue' onClick={this.handleOpen}>New Product</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon={true}>
                <Modal.Header>Create Product</Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <Form error={this.state.formError}>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ name: e.target.value })} label='Name' placeholder="Enter Name..."  />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ price: e.target.value })} label='Price' placeholder="Enter Price..."  />
                                </Form.Field>

                            </Form>
                        </Modal.Description>

                        :
                        <div className='modal-complete'>
                            <p>Your Data is submitted sucessfully.</p>
                           
                        </div>
                    }
                </Modal.Content>

                {!this.state.complete ?
                    <Modal.Actions>
                        <Button color='red' onClick={this.handleClose}>Close</Button>
                        <Button positive icon='checkmark' labelPosition='right' content="Create" onClick={this.createproductForm} />
                    </Modal.Actions>
                    : null}
                {this.state.formError ? (
                    <div>
                        <p>{this.state.errorMessage}</p>
                    </div>
                ) : null}
            </Modal>
        )

    }
}