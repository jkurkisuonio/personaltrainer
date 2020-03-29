import React, { useState }  from 'react';
import CustomerTable from './components/CustomerTable';
import AddCustomer from './components/AddCustomer';
import MySnackBar from './components/MySnackBar';
import { useConfirm } from 'material-ui-confirm';


function Customers() {

    const [customer, setCustomer] = useState({desc: '', date: ''});
    const [customers, setCustomers] = useState([]);
    const [snackbarVisible, setSnackBarVisible] = useState(false);    
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
  const confirm = useConfirm();

  const deleteCustomer = (link) => {
    // Show alertdialog    
    
    //if (window.confirm('Are you sure?')){
      confirm({description: 'Delete action is permanent!'})
    .then(() => {
      fetch(link,{method: 'DELETE'})
      .then (res => { fetchData();
        setSnackbarMsg('Customer Deleted.');
       setSnackBarVisible(true);
      })
      .catch(err => console.error(err))


     });
    }
      
  
   

 const handleClose = (event, reason) => {
 if (reason === 'clickaway') {
            setSnackBarVisible(false);
           return true;
      }
      setSnackBarVisible(false);  
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
     {snackbarVisible ? <MySnackBar  message={snackbarMsg} handleClose={handleClose} handleOpen={handleOpen} /> : null}
</div>
);
}
export default Customers;