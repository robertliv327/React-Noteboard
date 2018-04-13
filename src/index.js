import $ from 'jquery';
import './style.scss';

let numSeconds = 0;
setInterval(() => {
  numSeconds += 1;
  $('#main').html(`You have been on this page for ${numSeconds} seconds.`);
}, 1000);
