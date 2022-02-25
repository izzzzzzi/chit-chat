import React, { Component } from 'react';
import './Profile.css';
import {ENNEAGRAM_TYPE, MBTI_TYPE} from '../../constants/index';
import ColorPicker from "../../common/ColorPicker";


//속성(선택)

class Profile extends Component {
    constructor(props) {
        super(props);
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
                        </div>
                        <div className='options'>
                            <div className="option-box">
                                <input type="text" list='mbti-options'/>
                                <datalist id="mbti-options">
                                    {MBTI_TYPE.map((mbti,i) => {return (
                                        <option value={mbti} key={i}/>
                                    )})}
                                </datalist>
                            </div>
                            <div className="option-box">
                            <input type="text" list='enneagram-options'/>
                            <datalist id="enneagram-options">
                                {ENNEAGRAM_TYPE.map((enneagram,i) => {return (
                                    <option value={enneagram} key={i}/>
                                )})}
                            </datalist>
                            </div>
                            <div>
                                <ColorPicker/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile