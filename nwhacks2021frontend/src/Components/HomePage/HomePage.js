import React from 'react';
import { Button, Navbar, Modal, Form } from 'react-bootstrap';

// Component Dependencies
import NoteSetTile from '../NoteSetTile/NoteSetTile';
import FileDropper from '../FileDropper/FileDropper';

// CSS
import './HomePage.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabSelected: 0,
            showModal: true,
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });

        this.forceUpdate();
    }

    titleDidChange = (event) => {
        this.setState({
            newSetTitle: event.target.value
        });
    }

    handleNewFetchedData = (res) => {
        console.log(res);
        console.log(`Array ${res.data}`);
        this.setState({
            newSetCards: res.data
        });
    }

    buildAPIRequest = () => {
        console.log(this.state);
    }



    render() {
        return (
            <div className="HomePage">
                <Navbar fixed="top" variant="primary" className="HomeNavBar">
                    <Navbar.Brand> <strong>Wireframe</strong></Navbar.Brand>
                </Navbar>
                <div className="Sidebar">
                    <div className="SidebarOptions">
                        <Button onClick={this.toggleModal}> + Upload Notes </Button>
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

                <Modal show={this.state.showModal} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Notes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <FileDropper handleNewFetchedData={this.handleNewFetchedData}></FileDropper>
                        <Form>
                            <br />
                            <Form.Control type="email" placeholder="Card Set name" onChange={this.titleDidChange}/>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.buildAPIRequest}>
                            Create new cards
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default HomePage;