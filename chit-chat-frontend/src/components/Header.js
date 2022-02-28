import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';


export default function AppHeader(props) {
    return (
        <div className='app-wrapper'>
            <div className='app-logo'>
                <Link to="/">Chit Chat</Link>
            </div>
            <div className='app-nav'>
                { props.authenticated ? (
                    <ul>
                        <li>
                            <Link to="/voting">Voting</Link>
                        </li>
                        <li>
                            <Link to="/chatting-random">Chatting</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <a onClick={props.onLogout}>Logout</a>
                        </li>
                    </ul>
                ): (
                    <ul>
                        <li>
                            <Link to="/chatting-random">Chatting</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}