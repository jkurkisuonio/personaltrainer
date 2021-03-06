import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route  
} from "react-router-dom";
import { ConfirmProvider } from 'material-ui-confirm';

import Navigator from './Navigator.js';
import Home from './Home.js';
import About from './About.js';
import Customers from './Customers.js';
import Trainings from './Trainings.js';
import TrainingSchedule from './components/TrainingSchedule';




function App() {
  return (
    <ConfirmProvider>
    <div className="App">      
      <Router>
      <div>
          <Navigator />
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/trainings" component={Trainings}/>
              <Route path="/customers" component={Customers}/>
              <Route path="/schedules" component={TrainingSchedule}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" render={() => <h1>Contactaddress</h1>}/>
              <Route render={() => <h1>Page not found</h1>}/>
          </Switch></div>
      </Router>      
    </div>
    </ConfirmProvider>
  );
}

export default App;
