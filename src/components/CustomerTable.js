import React, { Component } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Trainings from './Trainings';
import EditCustomer from './EditCustomer';
import Button from '@material-ui/core/Button';

class CustomerTable extends Component
{

    render() {
        const columns = [
           /*   "firstname" : "John",
            "lastname" : "Johnson",
            "streetaddress" : "5th Street",
            "postcode" : "23110",
            "city" : "Flintsone",
            "email" : "john@mail.com",
            "phone" : "232-2345540",
            "content" : [ ],
            "links" : [ { */
           
            {Header:'FirstName', accessor: 'firstname'}, //  String-based value accessors!
            {Header:'LastName', accessor: 'lastname'}, //  String-based value accessors!
            {Header:'Street Address', accessor: 'streetaddress'}, //  String-based value accessors!
            {Header:'PostCode', accessor: 'postcode'}, //  String-based value accessors!
            {Header:'City',accessor: 'city'},
            {Header:'Email', accessor: 'email'}, //  String-based value accessors!
            {Header:'Phone', accessor: 'phone'}, //  String-based value accessors!    
            {Header:'Link', accessor: 'links[2].href', show: false},
            
            {
                sortable: false,
                filterable: false,
                width: 110,
                accessor: 'links[2].href',               
                Cell: ({row, original}) => <Trainings links={original.links}  name={original.firstname + ' ' + original.lastname} saveTraining={this.props.saveTraining} />
          
            },

            {
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: row => <EditCustomer updateCustomer={this.props.updateCustomer} customer={row.original} />
            },  
            {
                
                id:'delete',
                accessor: '_links.self.href',
                sortable: false,
                width: 110,
                filterable: false,            
                Cell: (row)=> (
                <Button style={{margin: 10}} variant="outlined" size="small" color="secondary" onClick={() => this.props.deleteCustomer(row.original.links[1].href)}>
                          Delete
                        </Button> 
                )}

                    
        ]


return(
    <ReactTable data={this.props.customers} filterable={true} columns={columns} sortable={true} defaultPageSize={10} /> )
}
};
export default CustomerTable;