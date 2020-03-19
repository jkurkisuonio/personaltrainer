import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function EditCustomer(props){

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
      const [customer, setCustomer] = React.useState({
              firstname: props.customer.firstname, lastname: props.customer.lastname,streetaddress: props.customer.streetaddress,postcode: props.customer.postcode, 
              city: props.customer.city, email: props.customer.email, phone: props.customer.phone
          }
      );
  
       const handleInputChange = (event) => {
          setCustomer({...customer, [event.target.name]: event.target.value })
      }
      
  
      const updateCustomer = () => {
          console.log("LINKS: " + props.customer.links[1].href);
          props.updateCustomer(customer, props.customer.links[1].href);
          handleClose();
      }
  



    return(
        <div>
      <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
       Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
        <DialogContent>   
            <TextField
                autoFocus
                margin="dense"
                name="firstname"
                label="First name"
                value={customer.firstname}
                type="text"
                onChange = {e => handleInputChange(e)}
            fullWidth/>
            <TextField     
                margin="dense"
                name="lastname"
                label="Last name"
                value={customer.lastname}
                type="text"
                onChange = {e => handleInputChange(e)}
            fullWidth/>
            <TextField     
                margin="dense"
                name="streetaddress"
                label="Street address"
                value={customer.streetaddress}
                type="text"
                onChange = {e => handleInputChange(e)}
            fullWidth/>
            <TextField     
                margin="dense"
                name="postcode"
                label="Postcode"
                value={customer.postcode}
                type="text"
                onChange = {e => handleInputChange(e)}
            fullWidth/>
            <TextField     
                margin="dense"
                name="city"
                label="City"
                value={customer.city}
                type="text"
                onChange = {e => handleInputChange(e)}
            fullWidth/>
            <TextField     
                margin="dense"
                name="email"
                label="Email"
                value={customer.email}
                type="text"
                onChange = {e => handleInputChange(e)}
            fullWidth/>
             <TextField     
                margin="dense"
                name="phone"
                label="Phone"
                value={customer.phone}
                type="text"
                onChange = {e => handleInputChange(e)}
            fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    )
}