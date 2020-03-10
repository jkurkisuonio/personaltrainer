import React, { Component } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Trainings from './Trainings';

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
                width: 100,
                accessor: 'links[2].href',               
                Cell: ({row, original}) => <Trainings link={original.links[2].href}  name={original.firstname + ' ' + original.lastname}/>
          
            },

           
            











            {
                Header: "Delete",
                id:'delete',
                accessor: str => "delete",
            
                Cell: (row)=> (
                <button
                      onClick={() => {
                       //   delCustomer(row.index)
                        }}>
                          Delete
                        </button> 
                )}

                    
        ]


return(
    <ReactTable data={this.props.customers} columns={columns} sortable={true} defaultPageSize={10} /> )
}
};
export default CustomerTable;