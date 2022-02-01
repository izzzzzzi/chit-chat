import logo from './logo.png';
import './App.css';
import GoogleButton from './GoogleButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GoogleButton/>
      </header>
    </div>
  );
}

export default App;
