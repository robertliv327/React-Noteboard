// import firebase from 'firebase';

class Datastore {
  constructor(db) {
    // db came from Firebase logic in index.js - passed in b/c need to use here
    this.database = db;
  }
  // fetch notes from db on update
  fetchNotes(callback) {
    this.database.ref('notes').on('value', (snapshot) => {
      const newNoteState = snapshot.val();
      callback(newNoteState);
    });
  }
  // add note to db
  addNote(newNote) {
    this.database.ref('notes').push(newNote);
  }
  // delete note from db
  deleteNote(id) {
    this.database.ref('notes').child(id).remove();
  }
  // update note to db
  updateNote(id, fields) {
    this.database.ref('notes').child(id).update(fields);
  }
}

export default Datastore;
