import React, { useState, useEffect } from 'react';
import './Profile.css';
import Emoji from './Emoji';
import profilePicture from '../../img/ProfilePicture.png'
import { MBTI_TYPE, ENNEAGRAM_TYPE } from '../../constants/index'
import Layout from '../../components/Layout'
import ProgressBar from '../../components/ProgressBar';
import ApiList from '../../api/ApiList';

export default function Profile(props) {
    const [userDetail, setUserDetail] = useState({});
    const [mbti, setMbti] = useState([]);
    const [enneagramCount, setenneagramCount] = useState([]);
    // mbtiList = MBTI_TYPE.map((mbti, i) => (<li key={i}>{mbti}</li>));
    // const enneagramList = ENNEAGRAM_TYPE.map((e, i) => (<li key={i}>{e}</li>));

    useEffect(() => {
        ApiList.getCurrentUser(res => {
            setUserDetail(res.user);
            const data = res.user.voteRecords;
            if ("0" in data) {
                // 객체의 value로 이루어진 배열이 반환
                const obj = Object.values(data["0"]);
                setMbti(mbti => mbti.concat(obj)); 
                console.log(mbti);
            obj.map((value,index) => {
                const newMbti = [];
                newMbti[index] = (value);
                console.log(newMbti);
                // setMbti(mbti => mbti.concat(newMbti));
                // setMbti(mbti => [...mbti, newMbti]);
                console.log(mbti);
            })
                // const mbtiArray = Object.entries(data["0"]);
            }
            if ("1" in data) {
                console.log("----");
                // setenneagramCount(Object.values(data["1"]));
            }
            if (!res) {console.log(res)};
        })
    }, []);

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
                        {/* <ul>
                        {mbtiTypeName.map((item, idx) => (
                        <li><ProgressBar className="progress-bar" key={idx} bgcolor={item.bgcolor} completed={item.voteCount} /></li>
                        ))}
                        </ul> */}
                    </div>
                    <div className='options'>
                        <ul>
                        {enneagramCount.map((item, idx) => (
                        <li>{item}<ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.voteCount} /></li>
                        ))}
                        </ul>
                    </div>
                </div>
        </Layout>
        
    )
}

