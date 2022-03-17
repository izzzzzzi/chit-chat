import React, { useState, useEffect } from "react";
import "./Profile.css";
import Emoji from "./Emoji";
import { USER, MBTI_ID, ENNEAGRAM_ID } from "../../constants/index";
import Layout from "../../components/Layout";
import ProgressBar from "../../components/ProgressBar";
import ApiList from "../../api/ApiList";

export default function Profile(props) {
  const testData = [
    { bgcolor: "rgb(75, 73, 73)", completed: 60 },
    { bgcolor: "rgb(75, 73, 73)", completed: 30 },
    { bgcolor: "rgb(75, 73, 73)", completed: 53 },
  ];

  const currentUser = JSON.parse(localStorage.getItem(USER));

  return (
    <Layout>
      <div className="profile-avatar">
        <img
          src={currentUser.profileImageUrl && currentUser.profileImageUrl}
          alt={currentUser.username}
        />
        {currentUser.nickname}
        {/* { currentUser.nickname ? <Emoji className="profile-name" label="alien" symbol="👽︎" />} */}
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
                  {item.personalityResultType}
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
                  {item.personalityResultType}
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
