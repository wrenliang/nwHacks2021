import {useState, useEffect} from 'react';

// Component Dependencies
import SetPage from '../Components/SetPage/setPage';
import HomePage from '../Components/HomePage/HomePage';
import LandingPage from '../Components/LandingPage/LandingPage'
<<<<<<< HEAD
=======

>>>>>>> 6e8dcf5c880c7ade09a1c155a9c63c6a2152b9e6

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

let mockSet = {
  creatorId: "Matthew",
  title: "nwHacks2021",
  collaboratorId: [],
  cards: [
    {
      term: "YEET",
      definition: "YAW" 
    },
    {
      term: "YOTE",
      definition: "YOOO"
    }
  ],
  listOfContributingDocs: "None"
}


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/set" render={(props) => <SetPage {...props} data={mockSet} />}/>
          <Route path="/home" render={(props) => <HomePage {...props} />}/>
          <Route path="/" render={(props) => <LandingPage {...props} />}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
