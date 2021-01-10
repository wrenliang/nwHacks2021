import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import "./LandingPage.css"
import Landing_Page_Graphic from "./Landing_Page_Graphic.svg"
import {withRouter} from 'react-router-dom';
var firebase = require("firebase/app").default;

require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyDiMhw8ocS_YU4t0A95Nw0o8FCc_ThG9pU",
    authDomain: "nwhacks2021-f6e09.firebaseapp.com",
    databaseURL: "https://nwhacks2021-f6e09-default-rtdb.firebaseio.com",
    projectId: "nwhacks2021-f6e09",
    storageBucket: "nwhacks2021-f6e09.appspot.com",
    messagingSenderId: "328011177868",
    appId: "1:328011177868:web:463da6aaa9eaf03280c0a9",
    measurementId: "G-PJSEW8HWLK"
};

firebase.initializeApp(firebaseConfig);

var globalUsername;

class PopUpH extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            termProperty: "",
            dividerProperty: "",
            showSyntaxPopUp: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.showSyntaxPopUp = this.showSyntaxPopUp.bind(this);
        this.closeSyntaxPopUp = this.closeSyntaxPopUp.bind(this);
    }

    closeSyntaxPopUp(){
        this.setState({
            showSyntaxPopUp: false
        });
    }

    showSyntaxPopUp(){
        this.setState({
            showSyntaxPopUp: true
        });
    }

    handleChange(event){
        let {name, value} = event.target;

        this.setState(() => ({
            [name]: value
        }))

        
    }

    submitLogin(event){
        event.preventDefault();
        this.showSyntaxPopUp();
    }

    handleSubmit(event){
        event.preventDefault();
        var {username, email, password, termProperty, dividerProperty, temp} = this.state;
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(termProperty);
        console.log(dividerProperty);

        globalUsername = username;
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("sign up success");
                console.log("uid:" + user.user.uid);
                var postBody = {
                    uuid: user.user.uid,
                    username: username,
                    syntax: {
                        termProperty: termProperty,
	                    dividerChar: dividerProperty
                    }
                }
                // fetch("http://localhost:8000/users", {
                //     method: 'POST',
                //     body: JSON.stringify(postBody), // string or object
                //     headers: {
                //     'Content-Type': 'application/json'
                //     }
                // });
                // Signed in 
                // ...

                // this.props.switchPage(user);
                // // console.log(this.props.history);
                // this.props.history.push({
                //     pathname: '/home',
                // });
                
                this.props.history.push('/home');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("error code: " + errorCode);
                console.log("error message:" + errorMessage);
            });

    }
    
    // adding syntax pop up to the home page
    // needs handleChange and handleSubmit

    render(){
        return(
            <div className="greyBackground">
                <div className="popUp">
                    <button className="closePopUp" onClick={this.props.closePopup}>close me</button>
                    <form className="form" onSubmit={this.submitLogin}>
                        <label className="formLabel">USERNAME:</label>
                        <input className="popUpInput" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        <label className="formLabel">EMAIL:</label>
                        <input className="popUpInput" type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        <label className="formLabel">PASSWORD:</label>
                        <input className="popUpInput" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        <input className="popUpSignUp" type="submit" value="Sign up" />
                    </form>
                </div>
                <Modal
                    show={this.state.showSyntaxPopUp}
                    onHide={this.closeSyntaxPopUp}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                >
                    
                    <Modal.Header closeButton>
                        <div>
                            <Modal.Title>Customize how your notes will be recognized</Modal.Title>
                            <p>You can change this later</p>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form">
                            <label className="formLabel">Term Property</label>
                            <select name="termProperty" id="termProperty" onChange={this.handleChange}>
                                <option disabled selected value> -- select an option -- </option>
                                <option value="bold">Bold</option>
                                <option value="italic">Italic</option>
                                <option value="underline">underline</option>
                            </select>
                            <label className="formLabel">Divider Property</label>
                            <select name="dividerProperty" id="dividerProperty" onChange={this.handleChange}>
                                <option disabled selected value> -- select an option -- </option>
                                <option value=":">:</option>
                                <option value="-">-</option>
                                <option value="/">/</option>
                            </select>
                        </form>
                        <div className="smallFontGroup">
                            <p className="smallFont"><b>Friendly Reminder</b></p>
                            <p className="smallFont">Don’t skip lines between term and definition</p>
                            <p className="smallFont">Don’t use term property on other contents</p>
                            <p className="smallFont">Don’t use multiple properties on one term</p>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmit}>Create Syntax</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        );
    }
}

const PopUp = withRouter(PopUpH);
function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

class LandingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPopup: false
        };

        this.logIn = this.logIn.bind();
        this.signUp = this.signUp.bind();
        this.signOut = this.signOut.bind();
        this.togglePopup= this.togglePopup.bind(this);
        this.switchPage = this.switchPage.bind(this);
    }

    switchPage(user) {
        console.log("CMON");
        this.history.props.push({
            pathname: '/home',
            state: user
        })
    }

    togglePopup() {
        console.log("executing toggle pop up");
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    logIn(){
        console.log("pressed log in");
        this.togglePopup();
        // firebase.auth().signInWithEmailAndPassword("alan.shuyaowen@gmail.com", "password")
        //     .then((user) => {
        //         console.log("log in success");
                
        //         // Signed in 
        //         // ...
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // ..
        //     });
    }

    signUp(){
        console.log("pressed sign up");
        // firebase.auth().createUserWithEmailAndPassword("alan.shuyaowen@gmail.com", "password")
        //     .then((user) => {
        //         console.log("sign up success");
                
        //         // Signed in 
        //         // ...
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //     });
    }

    signOut(){
        console.log("pressed sign out");
        // firebase.auth().signOut().then(() => {
        //     // Sign-out successful.
        //   }).catch((error) => {
        //     // An error happened.
        //   });
    }

    pushToHomePage = (user) => {
        console.log('calling this');
        this.props.history.push({
            pathname: '/home',
            state: user
        });
    }

    render(){
        return(
            <div class="pageContainer">
                <div className="NavBar">
                    <h1 className="navTitle">QueTips</h1>
                    <div className="buttonGroup">
                        <button className="loginButton">Log in</button>
                        <button className="signUpButton" onClick={this.togglePopup}>Sign up</button>
                        {/* <button onClick={this.signOut}>Sign out</button> */}
                    </div>
                </div>
                <div className="container">
                    <div className="subContainter">
                        <p className="titleText">Turn your notes<br/>into cue-cards</p>
                        <button className="getStartedButton" onClick={this.togglePopup}>Get started</button>
                    </div>
                    {/* <div className="tempForGraphic">temp</div> */}
                    <img src={Landing_Page_Graphic} className="landingPageImage"/>
                </div>
                {this.state.showPopup ? 
                    <PopUp
                        closePopup={this.togglePopup.bind(this)}
                        pushHandler={this.pushToHomePage}
                        historyProp={this.switchPage}
                    />
                    : null
                }

                {/* <Button variant="primary" onClick={handleShow}>
                    Launch static backdrop modal
                </Button> */}

                
            </div>
            
        )
    }
}

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         console.log("in onauthstatechange");
//         var uid = user.uid;
//         console.log(uid);
//         // var postBody = {
//         //     uuid: uid,
//         //     username: globalUsername,
//         //     syntax: {}
//         // }
//         // fetch("http://localhost:8000/users", {
//         //     method: 'POST',
//         //     body: JSON.stringify(postBody), // string or object
//         //     headers: {
//         //     'Content-Type': 'application/json'
//         //     }
//         // });
//         // ...
//     } else {
//       // User is signed out
//       // ...
//     }
    
// })

export default LandingPage;