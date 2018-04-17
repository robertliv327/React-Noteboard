import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import Immutable from 'immutable';
import Note from './components/note';
import CreateNote from './components/create_note';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  addNote = (text) => {

  }
  render() {
    return (
      <div>
        <CreateNote onCreate={this.addNote} />
        <div id="note-section">
          <Note />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
