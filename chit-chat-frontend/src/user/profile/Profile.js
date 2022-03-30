import React, { useEffect, useState } from "react";
import "./Profile.css";
import {
  USER,
  MBTI_ID,
  ENNEAGRAM_ID,
  RESPONSE_ENNEAGRAM_TO_ENNEAGRAM,
  RESPONSE_MBTI_TO_MBTI
} from "../../constants/index";
import Layout from "../../components/Layout";
import ProgressBar from "../../components/ProgressBar";
import ApiList from "../../api/ApiList";
import LoadingIndicator from "../../components/LoadingIndicator";

export default function Profile(props) {
  const [loading, setLoading] = useState(true);
  let currentUser = JSON.parse(localStorage.getItem(USER));

  useEffect(() => {
    ApiList.getCurrentUser(res => {
      localStorage.setItem(USER, JSON.stringify(res.body.user));
      currentUser = res.body.user;
      setLoading(false);
    })
  }, []);

  
  if (loading) return <LoadingIndicator/>;
  return (
    <Layout>
      <div className="profile-avatar">
        <img
          src={currentUser.profileImageUrl && currentUser.profileImageUrl}
          alt={currentUser.username}
        />
        {currentUser.nickname}
      </div>
      <div className="vote-text">
        <h2>Vote</h2>
      </div>
      <div className="vote-container">
        <div className="options">
          <ul>
            {Object.keys(currentUser.typeTotalVoteCounts).includes(MBTI_ID) &&
              currentUser.voteRecords[MBTI_ID].map((item, idx) => (
                <li>
                  {RESPONSE_MBTI_TO_MBTI[item.personalityResultType]}
                  <ProgressBar
                    className="progress-bar"
                    key={idx}
                    bgcolor={"black"} // TODO: need to apply color with enum variable
                    completed={(item.voteCount / currentUser.typeTotalVoteCounts[MBTI_ID]) * 100}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="options">
          <ul>
            {Object.keys(currentUser.typeTotalVoteCounts).includes(ENNEAGRAM_ID) &&
              currentUser.voteRecords[ENNEAGRAM_ID].map((item, idx) => (
                <li>
                  {RESPONSE_ENNEAGRAM_TO_ENNEAGRAM[item.personalityResultType]}
                  <ProgressBar
                    className="progress-bar"
                    key={idx}
                    bgcolor={"black"} // TODO: need to apply color with enum variable
                    completed={(item.voteCount / currentUser.typeTotalVoteCounts[ENNEAGRAM_ID]) * 100}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
