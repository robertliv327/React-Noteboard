import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import Note from './components/note';
import CreateBar from './components/create_bar';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Immutable.Map(),
      idCount: 0,
    };
  }
  addNote = (title, content) => {
    const noteObject = {
      title,
      text: content,
      x: 0 + (this.state.idCount * 5),
      y: 30 + (this.state.idCount * 5),
    };
    this.setState({
      notes: this.state.notes.set(this.state.idCount, noteObject),
    }, () => this.setState({ idCount: this.state.idCount + 1 }));
  }
  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.delete(id),
    });
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
            />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
