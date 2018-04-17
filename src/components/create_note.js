import React, { Component } from 'react';

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedName: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ requestedName: event.target.value });
  }
  render() {
    return (
      <div id="input-area">
        <input placeholder="New Note Title" onChange={this.onInputChange} value={this.state.requestedName} />
        <button className="button" type="button" name="button">Submit</button>
      </div>
    );
  }
}

export default CreateNote;
