// Component Dependencies
import FileDropper from '../Components/FileDropper/FileDropper';

import { Navbar, Button } from 'react-bootstrap';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar fixed="top" variant="light" className="Navbar">
            <Navbar.Brand> <strong>Cue-Tips</strong> </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Button>Hello</Button>
            </Navbar.Collapse>
      </Navbar>

      <div className="LandingPage">
        <FileDropper />
      </div>
      
    </div>
  );
}

export default App;
