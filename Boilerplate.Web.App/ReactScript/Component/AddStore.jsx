import React, { Component } from 'react';
import { Table, Modal, Button, Checkbox, Form, Header, Image } from 'semantic-ui-react';
import EditStore from './EditStore.jsx';
import DeleteStore from './DeleteStore.jsx';
import CreateStore from './CreateStore.jsx';




export default class AddStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            store: []

        };


    }

    handleStoEvent = (page) => {

        fetch("/Stores/GetStoreJson/?page=" + page)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({

                        isLoaded: true,

                        store: result,



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



    componentDidMount() {


        this.handleStoEvent(1);

    }



   



    render() {
        const { error, isLoaded, store } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>

                    <CreateStore loadfun={this.handleStoEvent} />

                    <Table border={50} size="small" color='black' striped textAlign="center">        
                        <Table.Header>
                            <Table.Row>
                               
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {store.items.map(store=> (
                                <Table.Row key={store.id}>
                                    
                                    <Table.Cell>{store.name}</Table.Cell>

                                    <Table.Cell>{store.address}</Table.Cell>
                                    <Table.Cell selectable>
                                        <EditStore data={store} loadfun={this.handleStoEvent} /></Table.Cell>
                                    <Table.Cell selectable>
                                        <DeleteStore data={store} loadfun={this.handleStoEvent}/></Table.Cell>

                                   


                                </Table.Row>

                            ))}

                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'></Table.HeaderCell>
                                <Button content="1" labelPosition="right" />
                                <Button icon="caret outline square left" size="large"
                                    labelPosition="right"
                                    onClick={() => this.handleStoEvent(this.state.store.metaData.pageNumber - 1)}
                                    disabled={!store.metaData.hasPreviousPage}
                                />
                                <div>
                                    <p>{store.metaData.pageNumber}<b> Page of </b> {store.metaData.pageCount}
                                    </p>
                                </div>
                                <Button icon="caret outline square right" size="large"
                                    labelPosition="left"
                                    onClick={() => this.handleStoEvent(this.state.store.metaData.pageNumber + 1)}
                                    disabled={!store.metaData.hasNextPage} />


                            </Table.Row>

                        </Table.Footer>
                    </Table>
                    
                </div>


            );

        }
    }
}





