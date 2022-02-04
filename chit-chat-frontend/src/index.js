import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/modules";
import ReactModal from 'react-modal';


// store 생성
const store = createStore(rootReducer);
console.log(store.getState());

ReactDOM.render(
    // react-router-dom 내장 컴포넌트, HTML5의 History API
    // 새로고침 없이 주소변경, props 내려주기
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

