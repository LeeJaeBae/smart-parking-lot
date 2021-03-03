import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import './style/index.css';
import App from './App/App';

Modal.setAppElement(document.getElementById('modal'));
ReactDOM.render(<App />, document.getElementById('root'));
