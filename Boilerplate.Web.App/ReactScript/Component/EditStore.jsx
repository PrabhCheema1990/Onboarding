import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AddStore from './AddStore';
import { Table, Modal, Button,Icon, Checkbox, Form, Header, Menu,Image, Container } from 'semantic-ui-react';
import NavBar from './NavBar';



export default class EditStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            address: this.props.data.address,
            id: this.props.data.id,

            nameError: false,

            addressError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            complete: false,
            modalOpen: false
        };
        this.editstoreForm = this.editstoreForm.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }



    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 5000);
        
    }

    handleClose = () => this.setState({ modalOpen: false, complete: false, name: "", address: ""}, () => this.props.loadfun(1))
    handleOpen = () => this.setState({ modalOpen: true })

    editstoreForm() {

        let error = false;

        if (this.state.name === '') {
            this.setState({ nameError: true })
            error = true
        } else {
            this.setState({ nameError: false })
            error = false
        }
        if (this.state.address === '') {
            this.setState({ addressError: true })
            error = true
        } else {
            this.setState({ addressError: false })
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
            Address: this.state.address,
            Id: this.state.id,

            
        }


        fetch("/Stores/EditStore", {
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
                <Modal.Header>Edit Store Details</Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <Form error={this.state.formError}>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ name: e.target.value })} label='Name' placeholder="Enter Name..." error={this.state.nameError} value={this.state.name} />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ address: e.target.value })} label='Address' placeholder="Enter Address..." error={this.state.addressError} value={this.state.address} />
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
                        <Button positive icon='checkmark' labelPosition='right' content="Submit" onClick={this.editstoreForm} />
                    </Modal.Actions>
                    : null}
               
            </Modal>
        )

    }
}