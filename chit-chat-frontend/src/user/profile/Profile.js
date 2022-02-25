import React, { Component } from 'react';
import './Profile.css';
import {ENNEAGRAM_TYPE, MBTI_TYPE} from '../../constants/index';
import { Link } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        userName: this.props,
        userMbtiType: "not choose",
        userEnneagramType: "not choose",
        userColorPick: "#FFF"
    }
    }

    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                this.props.currentUser.profileImageUrl ? (
                                    <img src={this.props.currentUser.profileImageUrl} alt={this.props.currentUser.username}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.username && this.props.currentUser.username[0]}
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.username}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                           <Link to={{
                               pathname: "/setting",
                               state: {userInfo : this.props}
                           }}>Edit Profile</Link>
                        </div>
                        <div className='options'>
                            <div className="option-box">
                                <h3>mbti {this.state.userMbtiType}</h3> 
                                {/* TODO 데이터 가져오기 */}
                            </div>
                            <div className="option-box">
                                <h3>enneagram {this.state.userEnneagramType}</h3>
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