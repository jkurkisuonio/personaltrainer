import React, { useState }  from 'react';
import CustomerTable from './components/CustomerTable';
import AddCustomer from './components/AddCustomer';
function Customers() {

    const [customer, setCustomer] = useState({desc: '', date: ''});
    const [customers, setCustomers] = useState([]);


    const updateCustomer = (customer, link) => {
      fetch(link, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(customer)
      })
      .then( res => fetchData())
      .catch(err => console.error(err))
    
  }

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')){
    fetch(link,{method: 'DELETE'})
    .then (res => { fetchData();   
    })
    .catch(err => console.error(err))
    }
} 


  
    const saveCustomer = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(customer)
      })
      .then( res => fetchData())
      .catch(err => console.error(err))
  }
  
    React.useEffect(() => {
          fetchData()
      }, [])

      const fetchData = () =>
      {
        console.log("Start fetching customers...");
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json()) 
        .then(responseData => { 
          setCustomers(responseData.content);
          console.log("Customers:" + responseData.content);
        })
        .catch(err => console.error(err))
      }


return (
<div>
    <h1>CUSTOMERS: </h1>
    <AddCustomer saveCustomer={saveCustomer} />
    <CustomerTable customers={customers} updateCustomer={updateCustomer} deleteCustomer={deleteCustomer} />
</div>
);
}
export default Customers;