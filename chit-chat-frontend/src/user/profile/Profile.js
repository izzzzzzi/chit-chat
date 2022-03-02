import React, { useState } from 'react';
import './Profile.css';
import Emoji from './Emoji';
import profilePicture from '../../img/ProfilePicture.png'
import { MBTI_TYPE, ENNEAGRAM_TYPE } from '../../constants/index'
import Layout from '../../components/Layout'
import ProgressBar from '../../components/ProgressBar';

export default function Profile(props) {
    const userDetail = props.currentUser;
    console.log(userDetail.voteRecords);
    const mbtiList = MBTI_TYPE.map((mbti, i) => (<li key={i}>{mbti}</li>));
    const enneagramList = ENNEAGRAM_TYPE.map((e, i) => (<li key={i}>{e}</li>));

    const testData = [
        { bgcolor: "rgb(75, 73, 73)", completed: 60 },
        { bgcolor: "rgb(75, 73, 73)", completed: 30 },
        { bgcolor: "rgb(75, 73, 73)", completed: 53 },
    ];

    return (
        <Layout>
                <div className='profile-avatar'>
                    <img 
                        src={userDetail.profileImageUrl ? userDetail.profileImageUrl : profilePicture} 
                        alt={userDetail.username}/>
                     <Emoji className="profile-name" label="alien" symbol="👽︎"/>
                </div>
            <div className='vote-text'>
                <h2>Vote</h2>
            </div>
                <div className='vote-container'>
                    <div className='options'>
                        <ul>
                        {testData.map((item, idx) => (
                        <li>INTP<ProgressBar className="progress-bar" key={idx} bgcolor={item.bgcolor} completed={item.completed} /></li>
                        ))}
                        </ul>
                    </div>
                    <div className='options'>
                        <ul>
                        {testData.map((item, idx) => (
                        <li>1w9<ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} /></li>
                        ))}
                        </ul>
                    </div>
                </div>
        </Layout>
        
    )
}

