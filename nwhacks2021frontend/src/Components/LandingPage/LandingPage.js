import React from 'react';
import "./LandingPage.css"
import Landing_Page_Graphic from "./Landing_Page_Graphic.svg"
var firebase = require("firebase/app").default;

require('firebase/auth');
require('firebase/database');
require('firebase/storage');

var firebaseConfig = {
    apiKey: "<place your own here>",
    authDomain: "<place your own here>",
    projectId: "<place your own here>",
    storageBucket: "<place your own here>",
    messagingSenderId: "<place your own here>",
    appId: "<place your own here>",
    measurementId: "<place your own here>"
};

firebase.initializeApp(firebaseConfig);

class PopUp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            email: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const {name, value} = event.target;

        this.setState(() => ({
            [name]: value
        }))
    }

    handleSubmit(event){
        event.preventDefault();
        const {username, email, password} = this.state;
        console.log(username);
        console.log(email);
        console.log(password);
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("sign up success");
                
                // Signed in 
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    render(){
        return(
            <div className="greyBackground">
                <div className="popUp">
                    <button className="closePopUp" onClick={this.props.closePopup}>close me</button>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <label className="formLabel">USERNAME:</label>
                        <input className="popUpInput" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        <label className="formLabel">EMAIL:</label>
                        <input className="popUpInput" type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        <label className="formLabel">PASSWORD:</label>
                        <input className="popUpInput" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        <input className="popUpSignUp" type="submit" value="Sign up" />
                    </form>
                </div>
            </div>
            
        );
    }
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
        firebase.auth().createUserWithEmailAndPassword("alan.shuyaowen@gmail.com", "password")
            .then((user) => {
                console.log("sign up success");
                
                // Signed in 
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    signOut(){
        console.log("pressed sign out");
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    render(){
        return(
            <div class="pageContainer">
                <div className="NavBar">
                    <h1 className="navTitle">WIREFRAME</h1>
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
                    />
                    : null
                }
            </div>
            
        )
    }
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("in onauthstatechange");
      var uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
});

export default LandingPage;