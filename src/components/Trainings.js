import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactTable from 'react-table-v6';
import moment from 'moment';
import AddTraining from './AddTraining';
import MySnackBar from './MySnackBar';
import { useConfirm } from 'material-ui-confirm';

export default function Trainings(props) {
    const [open, setOpen] = React.useState(false);

    const [snackbarVisible, setSnackBarVisible] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState('');

    const handleClickOpen = () => {     
      fetchData();
      setOpen(true);
    };

    const handleOpen = () =>
    {
      return true;
    }

    const fetchData = () =>
    {
      // Fetch particular Customers training sessions.
      console.log("Start fetching trainings...");
      console.log("LINKS:");
      console.log(props.links);
      fetch(props.links[2].href)
      .then(response => response.json()) 
      .then(responseData => { 
       setTrainings(responseData.content);
      console.log("Trainings: " + responseData.content);
 })
 .catch(err => console.error(err))
    }

    const saveTraining = (links,trainings,selectedDate) => {
      
      console.log("Links: " + links[2].href);
      console.log("Trainings: " + trainings);
      console.log("selectedDate: " + selectedDate);
      console.log("Duration: " + trainings.duration);
      trainings.customer = links[0].href;
      trainings.date = selectedDate;      
      fetch("https://customerrest.herokuapp.com/api/trainings", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(trainings)
    })
    .then( res => fetchData())
    .catch(err => console.error(err))
    }

    const confirm = useConfirm();
    
    const deleteTraining = (link) => {
      //if (window.confirm('Are you sure?')){
        confirm({description: 'Delete action is permanent!'})
        .then(() => {
          fetch(link,{method: 'DELETE'})
          .then (res => { fetchData();
            setSnackbarMsg('Training Deleted.');
            setSnackBarVisible(true);
            })
          .catch(err => console.error(err))
      });
    }
  

  
    const handleClose = () => {
      setOpen(false);
      setSnackBarVisible(false);
    };

    const handleSnackbarClose = () => {      
      setSnackBarVisible(false);
    };

    const [trainings, setTrainings] = React.useState([]);
 
    const columns = [    
            {Header:'Date', accessor: 'date', show: false},
         {Cell: ({row, original}) =>  moment(original.date).format('LL'), Header: 'Date'},
         {   Header:'Duration', accessor: 'duration', Cell: (row) => row.value != null ? row.value + " min" : null    }, 
         {Header:'Activity', accessor: 'activity'},
         {
                
          id:'delete',
          accessor: '_links.self.href',
          sortable: false,
          width: 100,
          filterable: false,            
          Cell: (row)=> (
          <Button style={{margin: 10}} variant="outlined" size="small" color="secondary" onClick={() => deleteTraining(row.original.links[1].href)}>
                    Delete
                  </Button> 
          )}
     ]

 

    return (
    <div>
      <Button  color="primary" onClick={handleClickOpen}>
       Trainings
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Trainings of {props.name}</DialogTitle>
        <AddTraining name={props.name} saveTraining={saveTraining} links={props.links}  />
        <DialogContent>             
           <ReactTable data={trainings} columns={columns} sortable={true} defaultPageSize={10} /> 
        </DialogContent>
        <DialogActions>         
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {snackbarVisible ? <MySnackBar  message={snackbarMsg} handleClose={handleSnackbarClose} handleOpen={handleOpen} /> : null}
     
    </div>
);
}