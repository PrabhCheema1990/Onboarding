import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Modal, Button, Checkbox, Form, Header, Menu, Image, Container } from 'semantic-ui-react';



export default class CreateCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            nameError: false,
            addressError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            complete: false,
            modalOpen: false
        };
        this.createcustomerForm = this.createcustomerForm.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }



    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 5000);

    }
    handleClose = () => this.setState({ modalOpen: false, complete: false, name: "", address: "", errorMessage: "  " }, () => this.props.loadfun(1))
    handleOpen = () => this.setState({ modalOpen: true })

    createcustomerForm() {


        let nerror = false;
        let aerror = false;
        if (this.state.name === "") {
            this.setState({ nameError: true });
            nerror = true;
            alert("Please Enter Name");
        } else {
            this.setState({ nameError: false });
            nerror = false;
        }
        if (this.state.address === "") {
            this.setState({ addressError: true });
            aerror = true;
            alert("Please Enter Address");
        } else {
            this.setState({ addressError: false });
            aerror = false;
        }
        if (nerror || aerror) {
            this.setState({ formError: true });
            return;
        } else {
            this.setState({ formError: false });
        }

        let customerdata = {
            Name: this.state.name,
            Address: this.state.address
        }


        fetch("/Customers/CreateCust", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",

            },

            body: JSON.stringify(customerdata)
        }).then(res => res.json())
            .then(function (body) {
                console.log(body)
            }).then(() => { this.successCallback(); })

    }




    render() {

        return (

            <Modal trigger={<Button size='big' active color='blue' onClick={this.handleOpen}>New Customer</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon={true}>
                <Modal.Header>Create Customer</Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <Form error={this.state.formError} onClick={this.handleonClick}>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ name: e.target.value })} label='Name' placeholder="Enter Name..." />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ address: e.target.value })} label='Address' placeholder="Enter Address..." />
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
                        <Button positive icon='checkmark' labelPosition='right' content="Create" onClick={this.createcustomerForm} />
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
