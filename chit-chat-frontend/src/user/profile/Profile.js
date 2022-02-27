import React, { useState } from 'react';
import './Profile.css';
import Emoji from './Emoji';
import profilePicture from '../../img/ProfilePicture.png'
import { MBTI_TYPE, ENNEAGRAM_TYPE } from '../../constants/index'

export default function Profile(props) {
    const [userInfo, setUserInfo] = useState(props.currentUser);
    const mbtiList = MBTI_TYPE.map((mbti, i) => (<li key={i}>{mbti}</li>));
    const enneagramList = ENNEAGRAM_TYPE.map((e, i) => (<li key={i}>{e}</li>));

    return (
        <div className='profile-info'>
            <div className='profile-avatar'>
                <img 
                    src={userInfo.profileImageUrl ? userInfo.profileImageUrl : profilePicture} 
                    alt={userInfo.username}/>
                <Emoji className="profile-name" label="alien" symbol="👽︎"/>
            </div>
            <div className='options'><ul>{mbtiList}</ul></div>
            <div className='options'><ul>{enneagramList}</ul></div>
        </div>
    )
}

