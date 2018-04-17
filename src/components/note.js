import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'testing',
      text: 'I is a note',
      x: 20,
      y: 20,
    };
    this.onDrag = this.onDrag.bind(this);
  }
  onDrag(e, ui) {
    this.setState({ x: ui.x, y: ui.y });
  }
  render() {
    return (
      <Draggable
        handle=".note-mover"
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.state.x, y: this.state.y }}
        grid={[1, 1]}
        onDrag={this.onDrag}
      >
        <div className="note">
          <div className="note-header">
            <p className="note-title">{this.state.title}</p>
            <div className="note-icons">
              <i className="note-trash fa fa-trash-o" />
              <i className="note-edit fa fa-pencil-square-o" />
              <i className="note-mover fa fa-arrows-alt" />
            </div>
          </div>
          <p className="note-content">{this.state.text}</p>
        </div>
      </Draggable>
    );
  }
}

export default Note;
