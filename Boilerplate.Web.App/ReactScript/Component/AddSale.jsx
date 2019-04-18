import React, { Component } from 'react';
import { Table, Modal, Button,Dropdown, Checkbox, Icon, Form, Header, Image } from 'semantic-ui-react';
import NavBar from './NavBar';
import EditSale from './EditSale.jsx';
import CreateSale from './CreateSale.jsx';
import DeleteSale from './DeleteSale.jsx';



export default class AddSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
         
            error: null,
            isLoaded: false,
            sale: [],

        };
    }

   

    handleSaleEvent = (page) => {

        fetch("/Sales/GetSalesJson/?page=" + page)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({

                        isLoaded: true,

                        sale: result,

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


        this.handleSaleEvent(1);




    }


    render() {
           

        const { error, isLoaded, sale } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
               
                    <CreateSale loadfun={this.handleSaleEvent} />
                    <Table striped solid border={50} size='small' color='black' textAlign="center" >
                        <Table.Header>
                            <Table.Row>
                               
                                <Table.HeaderCell>Customer</Table.HeaderCell>
                                <Table.HeaderCell>Product</Table.HeaderCell>
                                <Table.HeaderCell>Store</Table.HeaderCell>
                                <Table.HeaderCell>Date Sold</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {sale.items.map(sale => (
                                <Table.Row key={sale.id}>
                                   
                                    <Table.Cell>{sale.customerName}</Table.Cell>

                                    <Table.Cell>{sale.productName}</Table.Cell>
                                    <Table.Cell>{sale.storeName}</Table.Cell>

                                    <Table.Cell>{sale.dateSold}</Table.Cell>
                                    
                                    <Table.Cell textAlign="center">
                                        <EditSale editdata={sale} loadfun={this.handleSaleEvent} />
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <DeleteSale deletedata={sale} loadfun={this.handleSaleEvent} />
                                    </Table.Cell>


                                </Table.Row>

                            ))}

                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='5'></Table.HeaderCell>
                                <Button  labelPosition="right" />
                                <Button icon="caret outline square right" size="large"
                                    labelPosition="right"
                                    onClick={() => this.handleSaleEvent(this.state.sale.metaData.pageNumber - 1)}
                                    disabled={!sale.metaData.hasPreviousPage}
                                />
                                <div>
                                    <p>{sale.metaData.pageNumber}<b> Page of </b> {sale.metaData.pageCount}
                                    </p>
                                </div>
                                <Button icon="caret outline square right" size="large"
                                    labelPosition="left"
                                    onClick={() => this.handleSaleEvent(this.state.sale.metaData.pageNumber + 1)}
                                    disabled={!sale.metaData.hasNextPage} />


                            </Table.Row>

                        </Table.Footer>
                    </Table>

                </div>


            );

        }
    }
}



