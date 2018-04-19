import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import CreateBar from './create_bar';
import Datastore from '../services/datastore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Immutable.Map(),
      idCount: 0,
    };
    this.firebasedb = new Datastore(this.props.db);
  }
  // call to firebase to pull in data on mount
  componentDidMount() {
    this.firebasedb.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }
  // add note via firebase
  addNote = (title, content) => {
    const noteObject = {
      title,
      text: content,
      x: 0 + (this.state.idCount * 5),
      y: 30 + (this.state.idCount * 5),
    };
    this.firebasedb.addNote(noteObject);
    // from part 1
    // this.setState({
    //   notes: this.state.notes.set(fireKey, noteObject),
    // }, () =>
    this.setState({ idCount: this.state.idCount + 1 });
  }
  // delete note via firebase
  deleteNote = (id) => {
    // from part 1
    // this.setState({
    //   notes: this.state.notes.delete(id),
    // });
    this.firebasedb.deleteNote(id);
  }
  // update note via firebase
  updateNote = (id, fields) => {
    // from part 1
    // this.setState({
    //   notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    // });
    this.firebasedb.updateNote(id, fields);
  }
  render() {
    return (
      <div>
        <CreateBar onCreate={this.addNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note
              key={id}
              id={id}
              title={note.title}
              text={note.text}
              x={note.x}
              y={note.y}
              onDelete={this.deleteNote}
              onUpdate={this.updateNote}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
