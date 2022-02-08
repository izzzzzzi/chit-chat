import avatar from '../assets/avatar.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chit Chat</span>
        <ul className="list">
          <li className="listItem">
            <img src={avatar} alt="" className="avatar"/>
          </li>
          <li className="listItem">Min</li>
          <li className="listItem">Yea</li>
          <li className="listItem">Logout</li>
        </ul>
    </div>
  )
}

export default Navbar