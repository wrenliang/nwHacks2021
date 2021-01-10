import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

// Component Dependencies
import NoteSetTile from '../NoteSetTile/NoteSetTile';

// CSS
import './HomePage.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabSelected: 0,
            noteSets: [
                {
                    title: "Title1",
                    numTerms: 30,
                    setCreator: "wren.liang@gmail.com"
                },
                {
                    title: "Title2",
                    numTerms: 10,
                    setCreator: "wren.liang@gmail.com"
                },
                {
                    title: "Title3",
                    numTerms: 50,
                    setCreator: "wren.liang@gmail.com"
                },
                {
                    title: "Title3",
                    numTerms: 50,
                    setCreator: "wren.liang@gmail.com"
                },
                {
                    title: "Title3",
                    numTerms: 50,
                    setCreator: "wren.liang@gmail.com"
                }
            ]
        }

    }

    listOfSets = () => {
        if (this.state.tabSelected === 0) {
            const list = this.state.noteSets.map((set, index) => {
                return (
                    <NoteSetTile
                        key={index}
                        setTitle={set.title}
                        setNumTerms={set.numTerms}
                        setCreator={set.setCreator}>
                    </NoteSetTile>
                );
            });
            return list;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="HomePage">
                <Navbar fixed="top" variant="primary" className="HomeNavBar">
                    <Navbar.Brand> <strong>Wireframe</strong></Navbar.Brand>
                </Navbar>
                <div className="Sidebar">
                    
                    <div className="SidebarOptions">
                        <Button > + Upload Notes </Button>
                        <h5>Home</h5>
                        <h5>Folders</h5>
                        <h5>Shared with me</h5>
                    </div>
                </div>
                <div className="MainScreen">
                    <div className="NoteSetTiles">
                        {this.listOfSets()}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;