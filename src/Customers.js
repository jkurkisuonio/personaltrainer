import React, { useState }  from 'react';
import CustomerTable from './components/CustomerTable';
function Customers() {

    const [customer, setCustomer] = useState({desc: '', date: ''});
    const [customers, setCustomers] = useState([]);
  
    const addCustomer = (event) => {
      event.preventDefault();
      setCustomers([...customers, customer]);
    }
  
    const inputChanged = (event) => {
      setCustomer({...customer, [event.target.name]: event.target.value});
    }
    
    const dateChanged = event => {
      setCustomer({ ...customer, [event.target.name]: event.target.value });
      };

      React.useEffect(() => {
          console.log("Start fetching customers...");
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json()) 
        .then(responseData => { 
          setCustomers(responseData.content);
          console.log("Customers:" + responseData.content);
        })
        .catch(err => console.error(err))
      }, [])



return (
<div>
    <h1>CUSTOMERS PAGE HERE.</h1>
    <CustomerTable customers={customers} />




</div>
);
}
export default Customers;