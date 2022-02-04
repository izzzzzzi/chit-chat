import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    // react-router-dom 내장 컴포넌트, HTML5의 History API
    // 새로고침 없이 주소변경, props 내려주기
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

