import logo from '../logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../component/Button';

const Home = () => {
  return (
    <div>
      <h1>Main</h1>
      <img src={logo} className="App-logo" alt="logo" />
{/*       <Link to="/about">About</Link> */}
{/*       <Link to="/profiles/test1">test1</Link> */}
      <Button/>
    </div>
  )
}

export default Home;