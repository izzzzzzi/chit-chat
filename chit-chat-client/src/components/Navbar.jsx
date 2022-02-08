import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png';

const Navbar = ({user}) => {
  return (
    <div className="navbar">
      <span className="logo">
        <Link className='link' to="/">Chit Chat</Link>
        </span> {
          user ? (
            <ul className="list">
              <li className="listItem">
                <img src={avatar} alt="" className="avatar"/>
              </li>
              <li className="listItem">Min</li>
              <li className="listItem">Yea</li>
              <li className="listItem">Logout</li>
            </ul>
          ) : (
            <Link className='link' to="/login">LogIn</Link>
          )
        }
        
    </div>
  )
}

export default Navbar