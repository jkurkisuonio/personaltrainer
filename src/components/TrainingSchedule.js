import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import MomentUtils from '@date-io/moment';

export default function TrainingSchedule(props)
{

const [currentDate, setCurrentDate] = React.useState(Date.now());
const [scheduleData, setScheduleData] = React.useState([]);

    const [schedulerData, setschedulerData] = React.useState([]);

    const arr = [];

    function myFunction(item, index) {
      //console.log("ITEM DATE: " + item.date + " Duration: " + item.duration);
      //  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
      //let endDate = (MomentUtils(item.date)).add(item.duration, 'm').toDate();
      //let endDate = (MomentUtils(item.date));
      let dt = new Date(item.date); 
      let endDate = new Date(dt.getTime() + item.duration*60000);
     //console.log("End date: " + endDate);
      //arr.push({startDate: item.date, endDate: endDate, title: item.customer.firstname + " " + item.customer.lastname + " " + item.activity });
      let name = ""
      if (item != null && item.customer != null && item.customer.firstname != null) name = item.customer.firstname + " " + item.customer.lastname;
      arr.push({startDate: item.date, endDate: endDate, title:  item.activity + " / " + name });
      //console.log("ITEM DATE:" + item.date);
      //console.log("ITEM ACTIVITY: " + item.activity);
    }

    function fetchData () {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
          data.forEach(myFunction);          
           setScheduleData(arr);
        })
    };

  useEffect(() => {
    fetchData(); 
    console.log("Fetching data now time is: " + Date.now()); 
  }, []);

  

    return (
        <div>
             <Paper>
             
                <Scheduler data={scheduleData}>
                <Toolbar />
                <ViewState currentDate={currentDate} />
                <ViewSwitcher />
              
                <DayView startDayHour={8} endDayHour={21} />
                <WeekView  startDayHour={8} endDayHour={21} />
                <MonthView  startDayHour={8} endDayHour={21} />
                <Appointments />
                </Scheduler>
            </Paper>
        </div>
    );
}