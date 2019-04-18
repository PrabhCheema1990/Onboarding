import React, { Component } from 'react';
import { Table, Modal, Button, Checkbox,Icon,Form, Header, Image } from 'semantic-ui-react';
import EditCustomer from './EditCustomer.jsx';
import CreateCustomer from './CreateCustomer.jsx';
import DeleteCustomer from './DeleteCustomer.jsx';


export default class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            customer: []

        };


    }

    componentDidMount() {


        this.handlecustEvent(1);

    }


    handlecustEvent=(page)=>{

        fetch("/Customers/GetCustomerJson/?page=" + page)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        customer: result,

                    });


                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,

                        error
                    });
                }
            )



    }
   

    render() {
        const { error, isLoaded, customer} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <CreateCustomer loadfun={this.handlecustEvent} />

                    <Table solid border={50} size='small' color='black' striped textAlign="center">
                        <Table.Header>
                            <Table.Row>

                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {customer.items.map(customer => (
                                <Table.Row key={customer.id}>

                                    <Table.Cell>{customer.name}</Table.Cell>
                                    <Table.Cell>{customer.address}</Table.Cell>
                                    <Table.Cell selectable>
                                        <EditCustomer data={customer} loadfun={this.handlecustEvent} /></Table.Cell>
                                    <Table.Cell selectable>
                                        <DeleteCustomer data={customer} loadfun={this.handlecustEvent} /></Table.Cell>


                                </Table.Row>

                            ))}

                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'></Table.HeaderCell>
                                <Button labelPosition="right" />
                                <Button icon="caret outline square right" size="large"
                                    labelPosition="right"
                                    onClick={() => this.handlecustEvent(this.state.customer.metaData.pageNumber - 1)}
                                    disabled={!customer.metaData.hasPreviousPage}
                                />
                                <div>
                                    <p>{customer.metaData.pageNumber}<b> Page of </b>{customer.metaData.pageCount}
                                    </p>
                                </div>
                                < Button icon="caret outline square right" size="large"
                                    labelPosition="left"
                                    onClick={() => this.handlecustEvent(this.state.customer.metaData.pageNumber + 1)}
                                    disabled={!customer.metaData.hasNextPage} />


                            </Table.Row>

                        </Table.Footer>
                    </Table>

                </div>

            );

        }
    }
}

