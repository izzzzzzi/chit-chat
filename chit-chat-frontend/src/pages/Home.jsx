import logo from '../logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '../component/GoogleLoginButton';

const Home = () => {
  return (
    <div>
      <h1>Main</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <Link to="/about">About</Link>
      <Link to="/profiles/test1">test1</Link>
      <Link to="/profiles/test2">test2</Link>
      <Link to="/profiles/void">void</Link>
      <GoogleLoginButton/>
    </div>
  )
}

export default Home;