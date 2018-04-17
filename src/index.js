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
  render() {
    return (
      <div>
        <CreateNote />
        <div id="note-section">
          <Note />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
