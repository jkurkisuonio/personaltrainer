import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

export default function AddTraining(props){

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
      const [training, setTraining] = React.useState({
              date: new Date(), duration: '', activity: ''           
          }
      );

      const [duration, setDuration] = React.useState(0);
      
  
       const handleInputChange = (event) => {
          setTraining({...training, [event.target.name]: event.target.value })
      }
      
  
      const addTraining = () => {
        // Call function saveTraining - got it from parent
        props.saveTraining(props.links,training, selectedDate);
          handleClose();
      };

      const [activity, setActivity] = React.useState('');

      const handleTrainingChange = (event) => {
        let train = training;
        setActivity(event.target.value);
        train.activity = event.target.value;
        setTraining(train);
      };

      const handleDurationChange = (event,value) => {
        let train2 = training;
        setDuration(value);
        train2.duration = value;
        console.log("Value is: " + value);
        console.log("Duration is now: " + train2.duration);
        //console.log("Activity is: " + train2.activity);
        setTraining(train2);        
      }

      const [selectedDate, handleDateChange] = React.useState(new Date());
  
      //const [activity, setActivity] = React.useState('');

      //const handleChange = event => {
     //   setTraining(event.target.value);
     // };

      //function valuetext(value) {
       //  return `${value} minutes`; ;
      //}

      
     

    return(
        <div>
      <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
       New Training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new Training for {props.name}</DialogTitle>
        <DialogContent>  
        <Typography variant="h6" gutterBottom>
        Activity
      </Typography> 
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={activity}
          onChange={handleTrainingChange} >
            
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Fitness">Fitness</MenuItem>
          <MenuItem value="Gym training">Gym training</MenuItem>
          <MenuItem value="Spinning">Spinning</MenuItem>
        </Select>
           
        
      <Typography id="discrete-slider" gutterBottom>
        Duration ( {duration} minutes)
      </Typography>
      <Slider
        defaultValue={30}        
        aria-labelledby="discrete-slider"        
        valueLabelDisplay="on"
        onChange={handleDurationChange}
        step={15}
        marks
        min={15}
        max={240}
      />   

<MuiPickersUtilsProvider utils={MomentUtils}>   
<DatePicker value={selectedDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    )
}