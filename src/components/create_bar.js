import React, { Component } from 'react';

class CreateBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedTitle: '',
      requestedContent: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onTitleChange(event) {
    this.setState({ requestedTitle: event.target.value });
  }
  onContentChange(event) {
    this.setState({ requestedContent: event.target.value });
  }
  onSubmit(event) {
    this.props.onCreate(this.state.requestedTitle, this.state.requestedContent);
    this.setState({
      requestedTitle: '',
      requestedContent: '',
    });
  }
  render() {
    return (
      <div id="input-area">
        <input placeholder="New Note Title" onChange={this.onTitleChange} value={this.state.requestedTitle} />
        <input placeholder="New Note Content" onChange={this.onContentChange} value={this.state.requestedContent} />
        <button className="button" type="button" name="button" onClick={this.onSubmit}>Create Note</button>
      </div>
    );
  }
}

export default CreateBar;
