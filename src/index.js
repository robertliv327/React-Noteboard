import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const App = () => {
  return <div className="test">All the React are belong to us!</div>;
};

ReactDOM.render(<App />, document.getElementById('main'));

// let numSeconds = 0;
// setInterval(() => {
//   numSeconds += 1;
//   $('#main').html(`You have been on this page for ${numSeconds} seconds.`);
// }, 1000);
