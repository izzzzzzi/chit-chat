import React, { useState } from "react";
import Modal from 'react-modal';
import {ENNEAGRAM_TYPE, MBTI_TYPE, ENNEAGRAM_TO_REQUEST_ENUM, MBTI_TO_REQUEST_ENUM} from '../constants/index';
import ApiList from "../api/ApiList";
import './VoteModal.css';
import { Select } from 'grommet';

export default function VoteModal (props) {
  const [mbtiType, setMbtiType] = useState("");
  const [enneagramm, setEnneagram] = useState("");

  const handleMbtiType = ({option}) => {
    setMbtiType(option);
    const voteData = {
      ballotFromUserId: props.senderUserId,
      ballotToUserId: props.otherUserId,
      personalityResultType: MBTI_TO_REQUEST_ENUM[option],
    }
    ApiList.voteOtherUserType(voteData);
    console.log(voteData);
  }

  const handleEnneagram = ({option}) => {
    setEnneagram(option);
    const voteData = {
      ballotFromUserId: props.senderUserId,
      ballotToUserId: props.otherUserId,
      personalityResultType: ENNEAGRAM_TO_REQUEST_ENUM[option],
    }
    console.log(voteData);
    ApiList.voteOtherUserType(voteData);
  }

  const closeVote = () => {
    console.log(props)
    props.handleCloseModal();
  }

// ENNEAGRAM_CANCEL_VOTE
// MBTI_CANCEL_VOTE

  return (
    <div className="modal-container">
     <Modal isOpen={props.showModal} 
      onRequestClose={props.handleCloseModal} 
      appElement={document.getElementById('root')}>
      <div className="option-container">
        <span>Vote {props.OtherNickname}'s personalities!</span>
        <div className="select-wrapper">
          <Select className="select-box"
            options={MBTI_TYPE.map((mbti,i)=> mbti)}
            value={mbtiType}
            onChange={handleMbtiType}
          />
        </div>
        <div className="select-wrapper">
          <Select className="select-box"
            options={ENNEAGRAM_TYPE.map((mbti,i)=> mbti)}
            value={enneagramm}
            onChange={handleEnneagram}
          />
        </div>
        <button onClick={closeVote}>submit</button>
      </div>
    </Modal>
   </div>
  )
}
