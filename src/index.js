import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import './style/index.css';
import App from './App/App';

<html>
    <head>
    <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
    <script>
        Kakao.init("14ed875af27516409a47e848fe6ac869");
    </script>
    </head>
</html>

Modal.setAppElement(document.getElementById('modal'));
ReactDOM.render(<App />, document.getElementById('root'));
