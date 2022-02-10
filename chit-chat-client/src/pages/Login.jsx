// import Google from '../assets/google.png'
import Facebook from '../assets/facebook.png'

const Login = () => {

  const google = () => {
    window.open("http://localhost:8000/auth/google", "_self")
  }

  const facebook = () => {
    
  }

  return(
    <div className="login">
      <h1 className="loginTitle">Choose a Login</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Facebook} alt="" className="icon" />
            Googole
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
        </div>
        <div className="center">
          <div className="line"/>
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder='Usename' />
          <input type="text" placeholder='Password' />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login