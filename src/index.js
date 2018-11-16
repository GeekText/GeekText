import React from 'react';
import ReactDOM from 'react-dom';

import data from './assets/data/bookLibrary';
import App from './components/App';

/*
Importing the json file bookLibrary and passing it as a property named books
to the App component
*/

ReactDOM.render(
  <App books={data.books} className="Website"/>,
  document.getElementById('root')
);
