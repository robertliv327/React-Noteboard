// Import FirebaseAuth and firebase.
import React from 'react';
import ReactDOM from 'react-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import NoteApp from './components/notes_app';
import './style.scss';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyB618ggS9LurP3QgBdpevTG_rpbrQoCV_4',
  authDomain: 'react-notes-3a264.firebaseapp.com',
  projectId: 'react-notes-3a264',
  databaseURL: 'https://react-notes-3a264.firebaseio.com',
  storageBucket: 'react-notes-3a264.appspot.com',
  messagingSenderId: '472779733172',
};
firebase.initializeApp(config);
const db = firebase.database();

class SignInScreen extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false,
    },
  };

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div id="sign-in-box">
          <h1 className="sign-in-text">Welcome to React Notes</h1>
          <p className="sign-in-text">Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }
    return (
      <div className="container">
        <NoteApp db={db} />
        <button className="button" type="button" name="button" onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}

ReactDOM.render(<SignInScreen />, document.getElementById('main'));
