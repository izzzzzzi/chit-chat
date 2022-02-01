import logo from './logo.png';
import './App.css';
import GoogleLogin from './GoogleLogin';
import Router from 'react-router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GoogleLogin/>
      </header>
    </div>
  );
}

export default App;
