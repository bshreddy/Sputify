import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TopAppBar from './components/TopAppBar';

ReactDOM.render(<TopAppBar title="Sputify" />, document.getElementById('top-app-bar'));
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
