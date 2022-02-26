import React, { Component } from 'react';
import './Profile.css';
import Emoji from './Emoji';
import { MBTI_TYPE, ENNEAGRAM_TYPE } from '../../constants/index'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.currentUser
        }
    }

    render() {
        const userInfo = this.state.userInfo;
        const mbtiList = MBTI_TYPE.map((mbti) => (<li>{mbti}</li>));
        const enneagramList = ENNEAGRAM_TYPE.map((e) => (<li>{e}</li>));

        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                userInfo.profileImageUrl ? (
                                    <img src={userInfo.profileImageUrl} alt={userInfo.username}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{userInfo.username}
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           {/* <Link to={{
                               pathname: "/setting",
                               state: {userInfo : userInfo}
                           }}>Edit Profile</Link> */}
                        </div>
                        <div className='options'>
                            <Emoji label="alien" symbol="👽︎"/>
                            <div className="option-box">
                                {mbtiList}
                            </div>
                            <div className="option-box">
                                {enneagramList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;