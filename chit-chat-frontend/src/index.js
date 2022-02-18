import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './app/App';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);

// BrowserRouter : HTML5 - History API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경할 수 있도록 해줌

