import React from 'react';
import { Button, Navbar, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

// Component Dependencies
import NoteSetTile from '../NoteSetTile/NoteSetTile';
import FileDropper from '../FileDropper/FileDropper';

// CSS
import './HomePage.css';

// Icons
import HomeIcon from './HomeIcon.svg';
import FolderIcon from './FolderIcon.svg';
import SharedWithMeIcon from './SharedWithMeIcon.svg';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabSelected: 0,
            showModal: true,
            firebaseUser: this.props.user.user,
            sets: [],
            creatorId: this.props.user.user.uid
        }
        console.log(this.props.user);
    }

    componentDidMount() {
        this.getUserSets();
        console.log(this.state);
    }

    clickedOnASet = (index) => {
        console.log(`clicked ${index}`);
        this.props.history.push({
            pathname: '/set',
            state: this.state.sets[index]
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
        const url = `http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/sets?creatorId=${this.state.creatorId}`;

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
        const url = `http://ec2-34-214-245-195.us-west-2.compute.amazonaws.com:6464/sets`;

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

        await this.getUserSets();
        this.forceUpdate();

        this.toggleModal();
    }


    render() {
        return (
            <div className="HomePage">
                <Navbar fixed="top" variant="primary" className="HomeNavBar">
                    <Navbar.Brand style={{color: "white"}}> <strong>CueTips</strong></Navbar.Brand>
                </Navbar>
                <div className="Sidebar">
                    <div className="SidebarOptions">
                        <Button onClick={this.toggleModal} style={{width: "90%", backgroundColor: "#5C9CF5"}}> + Upload Notes </Button>
                        <h5 className="SidebarOptionText"> <img src={HomeIcon} width={26} height={26} className="d-inline-block align-top"></img> Home</h5>
                        <h5 className="SidebarOptionText"> <img src={FolderIcon} width={26} height={26} className="d-inline-block align-top"></img> Folders</h5>
                        <h5 className="SidebarOptionText"> <img src={SharedWithMeIcon} width={26} height={26} className="d-inline-block align-top"></img> Shared with me</h5>
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