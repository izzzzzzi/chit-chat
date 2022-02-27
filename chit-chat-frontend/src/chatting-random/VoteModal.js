import React, { useState } from "react";
import Modal from 'react-modal';
import {ENNEAGRAM_TYPE, MBTI_TYPE} from '../constants/index';

export default function VoteModal (props) {
  const [mbtiType, setMbtiType] = useState("");
  const [enneagramm, setEnneagram] = useState("");

  console.log(props.showModal);
  const handleMbtiType = (e) => {
    setMbtiType(e.target.value);
  }

  const handleEnneagram = (e) => {
    setEnneagram(e.target.value);
  }

  // post data to server
  const vote = () => {
    const voteData = {
      mbtiType: mbtiType,
      enneagramm: enneagramm
    }
  }

  return (
    <Modal 
      isOpen={props.showModal} 
      onRequestClose={props.handleCloseModal} 
      appElement={document.getElementById('root')}
      >
      <div className="vote-container">
      <button onClick={props.handleCloseModal}>X</button>
      <h2>Vote {props.ohterUserName}'s personalities!</h2>
        <div className="option-box">
            <input type="text" list='mbti-options'onChange={handleMbtiType}/>
            <datalist id="mbti-options">
                {MBTI_TYPE.map((mbti,i) => {return (
                    <option value={mbti} key={i}/>
                )})}
            </datalist>
        </div>
        <div className="option-box">
        <input type="text" list='enneagram-options' onChange={handleEnneagram}/>
            <datalist id="enneagram-options">
                {ENNEAGRAM_TYPE.map((enneagram,i) => {return (
                    <option value={enneagram} key={i}/>
                )})}
            </datalist>
        </div>
        <button onClick={vote}>Submit</button>
        </div>
    </Modal>
  )
}
