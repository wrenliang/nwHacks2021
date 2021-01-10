import {useState, useEffect} from 'react';

// Component Dependencies
import SetPage from '../Components/SetPage/setPage';
import HomePage from '../Components/HomePage/HomePage';
import LandingPage from '../Components/LandingPage/LandingPage'

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
  const[userInfo, setUserInfo] = useState({});

  const updateUserInfo = (data) => {
    setUserInfo(data);
  }

  return (
    <Router>
      <div>
          <Route path="/" render={(props) => <LandingPage {...props}/>}/>
          <Route path="/set" render={(props) => <SetPage {...props} data={mockSet}  updateUser={updateUserInfo}/>}/>
          <Route path="/home" render={(props) => <HomePage {...props}/>}/>
          

          {/* <LandingPage/> */}
      </div>
    </Router>
  );
}

export default App;
