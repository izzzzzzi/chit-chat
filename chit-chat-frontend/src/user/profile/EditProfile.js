import React, { Component } from 'react';
import './Profile.css';
import {ENNEAGRAM_TYPE, MBTI_TYPE} from '../../constants/index';
import ColorPicker from "../../common/ColorPicker";
import ApiList from '../../api/ApiList';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.location.state.userInfo
        }
    }

    colorRef = React.createRef();

    setColor = () => {
        this.setState({
            userColorPick: this.colorRef.current.state.color
        })
    }

    setUserName = (e) => {
        this.setState({userName: e.target.value});
    }

    setMbtiType = (e) => {
        this.setState({userMbtiType: e.target.value});
    }

    setEnneagram = (e) => {
        this.setState({userEnneagramType: e.target.value});
    }

    onSubmit = () => {
        this.setColor();
        const data = Object.assign({}, this.state);
        console.log(data);
        ApiList.settingUserProfile(data);
    }

    render() {
        const currentUser  = this.state.userInfo;
        return (
            <div className="profile-container">
                {console.log(currentUser)}
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                currentUser.profileImageUrl ? (
                                    <img src={currentUser.profileImageUrl} alt={currentUser.username}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{currentUser.username && currentUser.username[0]}
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <input defaultValue={currentUser.username} onChange={this.setUserName}/>
                        </div>
                        <div className='options'>
                            <div className="option-box">
                                <input type="text" list='mbti-options'onChange={this.setMbtiType}/>
                                <datalist id="mbti-options">
                                    {MBTI_TYPE.map((mbti,i) => {return (
                                        <option value={mbti} key={i}/>
                                    )})}
                                </datalist>
                            </div>
                            <div className="option-box">
                            <input type="text" list='enneagram-options' onChange={this.setEnneagram}/>
                                <datalist id="enneagram-options">
                                    {ENNEAGRAM_TYPE.map((enneagram,i) => {return (
                                        <option value={enneagram} key={i}/>
                                    )})}
                                </datalist>
                            </div>
                            <div>
                                <ColorPicker ref={this.colorRef}/>
                            </div>
                            <button onClick={this.onSubmit}>submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfile