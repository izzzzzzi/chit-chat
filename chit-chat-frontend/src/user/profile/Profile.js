import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile