import React from 'react';
import './Home.css';
import logo from '../img/ProfilePicture.png'

export default function Home () {
    return(
        <div className="home-container">
            <h1 className="home-title">CHIT CHAT HOME</h1>
            <div className="container">
                <div className="graf-circle"/> 
                <div className="graf-circle"/>
                <div className="graf-circle"/>
                <div className="graf-circle"/>
                <div className="graf-circle"/>
                <div className="graf-circle"/>
                <div className="graf-circle"/>
                <div className="graf-circle"/>
                <div className="graf-circle"/>
                <div className="graf-circle"/>
                <img className='graf-circle' src={logo} alt='logo'/> 
            </div>
        </div>        
    )
}
