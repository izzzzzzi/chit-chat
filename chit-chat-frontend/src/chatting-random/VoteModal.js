import React, { useState } from "react";
import Modal from 'react-modal';
import {ENNEAGRAM_TYPE, MBTI_TYPE} from '../constants/index';
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
      ballotToUserId: props.ohterUserId,
      personalityResultType: mbtiType,
    }
    ApiList.voteOtherUserType(voteData);
    console.log(voteData);
  }

  const handleEnneagram = ({option}) => {
    setEnneagram(option);
    const voteData = {
      ballotFromUserId: props.senderUserId,
      ballotToUserId: props.ohterUserId,
      personalityResultType: enneagramm,
    }
    console.log(voteData);
    ApiList.voteOtherUserType(voteData);
  }

  const cancelVote = () => {
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
        <span>Vote {props.ohterUserName}'s personalities!</span>
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
        <button onClick={cancelVote}>cancel</button>
      </div>
    </Modal>
   </div>
  )
}
