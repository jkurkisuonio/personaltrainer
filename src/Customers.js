import React, { useState }  from 'react';
import CustomerTable from './components/CustomerTable';
import AddCustomer from './components/AddCustomer';
import MySnackBar from './components/MySnackBar';

function Customers() {

    const [customer, setCustomer] = useState({desc: '', date: ''});
    const [customers, setCustomers] = useState([]);
    const [snackbarVisible, setSnackBarVisible] = useState(true);
    const [snackbarMsg, setSnackbarMsg] = useState('');


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
      setSnackbarMsg('Customer Deleted.');
     setSnackBarVisible(true);
    })
    .catch(err => console.error(err))
    }
} 

 const handleClose = (event, reason) => {
 if (reason === 'clickaway') {
           return true;
      }
        return false;
        
     };

 const handleOpen = () =>
 {
   return true;
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
    <CustomerTable customers={customers} updateCustomer={updateCustomer} deleteCustomer={deleteCustomer}  />
    <MySnackBar visible={snackbarVisible} message={snackbarMsg} handleOpen={handleOpen} handleClose={handleClose} />
</div>
);
}
export default Customers;