// Component Dependencies
import SetPage from '../Components/SetPage/setPage';

import {useState, useEffect} from 'react';
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
          <Route path="/set" render={(props) => <SetPage {...props} data={mockSet}  updateUser={updateUserInfo}/>}/>

      </div>
    </Router>
  );
}

export default App;
