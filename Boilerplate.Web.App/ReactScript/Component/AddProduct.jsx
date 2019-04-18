import React, { Component } from 'react';
import { Table, Modal, Button, Icon,Checkbox, Form, Header, Image } from 'semantic-ui-react';
import EditProduct from './EditProduct.jsx';
import CreateProduct from './CreateProduct.jsx';
import DeleteProduct from './DeleteProduct.jsx';



export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            product:[]

        };


    }

    handleProEvent = (page) => {

        fetch("/Products/GetProductJson/?page=" + page)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({

                        isLoaded: true,

                        product: result,



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


        this.handleProEvent(1);

    }



    render() {
        const { error, isLoaded, product} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <CreateProduct loadfun={this.handleProEvent} />

                    <Table solid border={50} size='small' color='black' striped textAlign="center">                 
                        <Table.Header>
                            <Table.Row>
                               
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {product.items.map(product => (
                                <Table.Row key={product.id}>
                                   
                                    <Table.Cell>{product.name}</Table.Cell>

                                    <Table.Cell>{product.price}</Table.Cell>
                                    <Table.Cell selectable>
                                        <EditProduct data={product} loadfun={this.handleProEvent} /></Table.Cell>
                                    <Table.Cell selectable>
                                        <DeleteProduct data={product} loadfun={this.handleProEvent}/></Table.Cell>


                                </Table.Row>

                            ))}

                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'></Table.HeaderCell>
                                <Button  labelPosition="right" />
                                <Button icon="caret outline square right" size="large"
                                    labelPosition="right"
                                    onClick={() => this.handleProEvent(this.state.product.metaData.pageNumber - 1)}
                                    disabled={!product.metaData.hasPreviousPage}
                                />
                                <div>
                                    <p>{product.metaData.pageNumber}<b> Page of </b>{product.metaData.pageCount}
                                    </p>
                                </div>
                                < Button icon="caret outline square right" size="large"
                                    labelPosition="left"
                                    onClick={() => this.handleProEvent(this.state.product.metaData.pageNumber + 1)}
                                    disabled={!product.metaData.hasNextPage} />


                            </Table.Row>

                        </Table.Footer>
                    </Table>
                
                </div>

            );

        }
    }
}



