import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactTable from 'react-table-v6';

export default function Trainings(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      // Fetch particular Customers training sessions.
      console.log("Start fetching trainings...");
      fetch(props.link)
      .then(response => response.json()) 
      .then(responseData => { 
        setTrainings(responseData.content);
        console.log("Trainings: " + responseData.content);
      })
      .catch(err => console.error(err))

      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [trainings, setTrainings] = React.useState([]);

     const handleInputChange = (event) => {
      //  setCar({...car, [event.target.name]: event.target.value })
    }
    

    const updateCar = () => {
        //props.updateCar(car, props.car._links.car.href);
        handleClose();
    }

    const columns = [
       /* "links" : [ {
            "rel" : "self",
            "href" : "https://customerrest.herokuapp.com/api/customers/1/trainings"
          } ],
          "content" : [ {
            "date" : "2020-03-10T17:25:55.931+0000",
            "duration" : 60,
            "activity" : "Spinning",
            "content" : [ ],
            "links" : [ {
              "rel" : "self",
              "href" : "https://customerrest.herokuapp.com/api/trainings/13"
            }, {
              "rel" : "training",
              "href" : "https://customerrest.herokuapp.com/api/trainings/13"
            }, {
              "rel" : "customer",
              "href" : "https://customerrest.herokuapp.com/api/trainings/13/customer"
            } ]
          }, {*/
        
         {Header:'Date', accessor: 'date'}, //  String-based value accessors!
         {Header:'Duration', accessor: 'duration'}, //  String-based value accessors!
         {Header:'Activity', accessor: 'activity'} //  String-based value accessors!                          
     ]

 

    return (
    <div>
      <Button  color="primary" onClick={handleClickOpen}>
       Trainings
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Trainings of {props.name}</DialogTitle>
        <DialogContent>   
           TRAINING HERE ...
           <ReactTable data={trainings} columns={columns} sortable={true} defaultPageSize={10} /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateCar} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
);
}