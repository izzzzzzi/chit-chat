import logo from '../logo.png';
import GoogleLogin from '../GoogleLogin';

const Home = () => {
  return (
    <div>
      <h1>Main</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <GoogleLogin/>
    </div>
  )
}

export default Home;