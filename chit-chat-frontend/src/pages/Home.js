import logo from '../logo.png';
import GoogleLoginButton from '../GoogleLoginButton';

const Home = () => {
  return (
    <div>
      <h1>Main</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <GoogleLoginButton/>
    </div>
  )
}

export default Home;