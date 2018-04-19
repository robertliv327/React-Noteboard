// import firebase from 'firebase';

class Datastore {
  constructor(db) {
    // Initialize Firebase
    // const config = {
    //   apiKey: 'AIzaSyB618ggS9LurP3QgBdpevTG_rpbrQoCV_4',
    //   authDomain: 'react-notes-3a264.firebaseapp.com',
    //   databaseURL: 'https://react-notes-3a264.firebaseio.com',
    //   projectId: 'react-notes-3a264',
    //   storageBucket: 'react-notes-3a264.appspot.com',
    //   messagingSenderId: '472779733172',
    // };
    // firebase.initializeApp(config);
    // Get a reference to the database service
    // this.databasae = firebase.database();
    this.database = db;
  }
  fetchNotes(callback) {
    this.database.ref('notes').on('value', (snapshot) => {
      const newNoteState = snapshot.val();
      callback(newNoteState);
    });
  }
  addNote(newNote) {
    this.database.ref('notes').push(newNote);
  }
  deleteNote(id) {
    this.database.ref('notes').child(id).remove();
  }
  updateNote(id, fields) {
    this.database.ref('notes').child(id).update(fields);
  }
}

export default Datastore;
