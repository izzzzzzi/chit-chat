import React from 'react';
import './Home.css';
import logo from '../img/ProfilePicture.png'

export default function Home () {
    return(
        <div className="home-container">
            <div className="container">
                    <img className='app-logo' src={logo} alt='logo'/>
                <h1 className="home-title">CHIT CHAT HOME</h1>
            </div>
        </div>        
    )
}
