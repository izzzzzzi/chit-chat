import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Emoji from './Emoji';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.currentUser
        }
    }

    render() {
        const userInfo = this.state.userInfo;
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
                                <h3>{userInfo.mbtiTypeInfo ? userInfo.mbtiTypeInfo : "no vote"}</h3> 
                                {/* TODO 데이터 가져오기 */}
                            </div>
                            <div className="option-box">
                                <h3>{userInfo.enneagramTypeInfo ? userInfo.enneagramTypeInfo : "no vote"}</h3>
                                {/* TODO 데이터 가져오기 */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;