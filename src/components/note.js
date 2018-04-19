import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';

class Note extends Component {
  // needed because constructor wasn't being called on re-render of note...
  // before adding this, props were being passed in but state was not updated
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      title: nextProps.title,
      text: nextProps.text,
      x: nextProps.x,
      y: nextProps.y,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      text: this.props.text,
      x: this.props.x,
      y: this.props.y,
      id: this.props.id,
      isEditing: false,
    };
    this.onDrag = this.onDrag.bind(this);
    this.onTrashClick = this.onTrashClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }
  onDrag(e, ui) {
    this.setState({ x: ui.x, y: ui.y });
    this.updateNote();
  }
  onTrashClick(event) {
    this.props.onDelete(this.state.id);
  }
  onEditClick(event) {
    this.setState({ isEditing: true });
  }
  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  onContentChange(event) {
    this.setState({ text: event.target.value });
  }
  // when user is finished editing...
  onSave(event) {
    this.setState({
      isEditing: false,
      title: this.state.title,
      text: this.state.text,
    });
    this.updateNote();
  }
  // create fields object and pass up to parent for update of note
  updateNote() {
    const fields = {
      title: this.state.title,
      text: this.state.text,
      x: this.state.x,
      y: this.state.y,
    };
    this.props.onUpdate(this.state.id, fields);
  }
  renderNote() {
    if (this.state.isEditing) {
      // render note in editing mode... with textarea and input fields in place of title and text
      return (
        <div className="note">
          <div className="note-header">
            <input className="note-title border" placeholder="Edit title" onChange={this.onTitleChange} value={this.state.title} />
            <div className="note-icons">
              <i className="note-trash fa fa-trash-o" onClick={this.onTrashClick} />
              <i className="note-edit fa fa-check" onClick={this.onSave} />
              <i className="note-mover fa fa-arrows-alt" />
            </div>
          </div>
          <Textarea className="note-content border" placeholder="Edit text" onChange={this.onContentChange} value={this.state.text} />
        </div>
      );
    } else {
      // render note as normal
      return (
        <div className="note">
          <div className="note-header">
            <p className="note-title">{this.state.title}</p>
            <div className="note-icons">
              <i className="note-trash fa fa-trash-o" onClick={this.onTrashClick} />
              <i className="note-edit fa fa-pencil-square-o" onClick={this.onEditClick} />
              <i className="note-mover fa fa-arrows-alt" />
            </div>
          </div>
          <div className="note-content" dangerouslySetInnerHTML={{ __html: marked(this.state.text || '') }} />
        </div>
      );
    }
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
        {this.renderNote()}
      </Draggable>
    );
  }
}

export default Note;
