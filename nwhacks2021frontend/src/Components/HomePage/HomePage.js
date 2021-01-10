import React from 'react';
import { Button, Navbar, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

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
            firebaseUser: this.props.firebaseUser,
            sets: []
        }
    }

    componentDidMount() {
        this.getUserSets();
        console.log(this.state);
    }

    clickedOnASet = (index) => {
        console.log(`clicked ${index}`);
        this.props.history.push({
            pathname: '/set',
            data: this.state.sets[index]
        });
    }

    listOfSets = () => {
        if (this.state.tabSelected === 0) {
            const list = this.state.sets.map((set, index) => {
                return (
                    <NoteSetTile
                        key={index}
                        setTitle={set.set.title}
                        setNumTerms={set.setSize}
                        setCreator={set.set.creatorId}
                        clickHandler={() => this.clickedOnASet(index)}
                        >
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

    getUserSets = async () => {
        const url = `http://localhost:8000/sets?creatorId=${this.state.creatorId}`;

        const res = await axios.get(url);

        let sets = [];

        for (var set of res.data.sets) {
            sets.push({
                set: set,
                setSize: set.cards.length
            });
        }

        this.setState({
            sets: sets
        });

        console.log(this.state);
    }

    postCreatedSet = async () => {
        const url = `http://localhost:8000/sets`;

        const body = {
            creatorId: this.state.creatorId,
            title: this.state.newSetTitle,
            cards: this.state.newSetCards
        }

        const res = await axios.post(url, body);

        console.log(res);
    }

    createNewCardsClicked = async () => {
        await this.postCreatedSet();

        this.toggleModal();

        await this.getUserSets();
        this.forceUpdate();
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
                        <Button variant="primary" onClick={this.createNewCardsClicked}>
                            Create new cards
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default HomePage;