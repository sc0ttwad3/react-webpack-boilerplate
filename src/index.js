
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));

// Verify ES2016
console.log(`2 + 8 is ${2+8}`);
console.log('Hello... it\'s ' + moment().format('h:mm:ss a') + '!');
let current = moment().format('h:mm:ss a')
console.log(`Hello... it\'s ${current}!`);
