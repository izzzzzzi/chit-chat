import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import router from './router'
import axios from 'axios'
import store from './store'

const BACKEND_PORT = process.env.BACKEND_PORT === null ? '' : `:${process.env.BACKEND_PORT}`
const BACKEND_DOMAIN = window.location.hostname
axios.defaults.baseURL = `http://${BACKEND_DOMAIN}${BACKEND_PORT}`

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
