import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Modal, Button, Checkbox, Form,Icon, Header, Menu, Image, Container } from 'semantic-ui-react';

import AddCustomer from './AddCustomer.jsx';

export default class DeleteCustomer extends Component {
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
        this.deletecustomerForm = this.deletecustomerForm.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }



    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 5000);
     
    }

    handleClose = () => this.setState({modalOpen: false, complete: false, name: "", address: ""}, () => this.props.loadfun(1))
    handleOpen = () => this.setState({ modalOpen: true })

    deletecustomerForm() {

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
            this.setState({ aError: true });
            aerror = true;
            alert("Please Enter Address");
        } else {
            this.setState({ Error: false });
            aerror = false;
        }
        if (nerror || aerror) {
            this.setState({ formError: true });
            return;
        } else {
            this.setState({ formError: false });
        }

        let data = {
            Name: this.state.name,
            Address: this.state.address,
            Id: this.state.id,

            
        }


        fetch("/Customers/DeleteCustomer", {
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
                <Modal.Header>Delete Customer </Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <p> Are you sure? </p>
                        </Modal.Description>

                        :
                        <div>
                            <p>Customer has been deleted successfully</p>
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


                            onClick={() => this.deletecustomerForm()}>
                            <Icon inverted fitted name='trash' />Delete


                        </Button>
                    </Modal.Actions>
                    : null}



            </Modal>

        )
    }
}