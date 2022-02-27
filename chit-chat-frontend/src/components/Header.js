import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';


export default function AppHeader(props) {
    return (
        <div className='app-wrapper'>
            <div>
                <Link to="/">Chit Chat</Link>
            </div>
            <div className='app-nav'>
                { props.authenticated ? (
                    <ul>
                        <li>
                            <NavLink to="/chatting-random">Chatting</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <a onClick={props.onLogout}>Logout</a>
                        </li>
                    </ul>
                ): (
                    <ul>
                        <li>
                            <NavLink to="/chatting-random">Chatting</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}