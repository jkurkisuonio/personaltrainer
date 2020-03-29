import React  from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function MySnackbar(props){
    
    { 

    // const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //      return;
    //  }
    //    setOpen(false);
    //    
    // };
   const [open, setOpen] = React.useState(props.visible);
  
  return (    
   <div>     
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.handleOpen}
        autoHideDuration={6000}
        onClose={props.handleClose}
        message={props.message}
        action={
          <React.Fragment>    
            <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};
}