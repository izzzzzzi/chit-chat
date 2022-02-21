import React, { Component } from 'react';
import './Profile.css';
import {ENNEAGRAM_TYPE, MBTI_TYPE, COLOR} from '../../constants/index';


// 에니어그램(선택), 색깔(선택), 속성(선택)

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser : props.currentUser
        }
    }
    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                this.state.currentUser.profileImageUrl ? (
                                    <img src={this.state.currentUser.profileImageUrl} alt={this.state.currentUser.username}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.state.currentUser.username && this.state.currentUser.username[0]}
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.state.currentUser.username}</h2>
                           <p className="profile-email">{this.state.currentUser.email}</p>
                        </div>
                        <div>
                            <input type="text" list='mbti-options'/>
                            <datalist id="mbti-options">
                                {MBTI_TYPE.map((mbti,i) => {return (
                                    <option value={mbti} key={i}/>
                                )})}
                            </datalist>
                            <input type="text" list='enneagram-options'/>
                            <datalist id="enneagram-options">
                                {ENNEAGRAM_TYPE.map((enneagram,i) => {return (
                                    <option value={enneagram} key={i}/>
                                )})}
                            </datalist>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile