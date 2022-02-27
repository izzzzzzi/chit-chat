import React from "react";
import Modal from 'react-modal';
import {ENNEAGRAM_TYPE, MBTI_TYPE} from '../constants/index';

export default function VoteModal (props) {

  console.log(props.showModal);
  const setMbtiType = () => {
    console.log("test")
  }

    const setEnneagram = () => {
    console.log("test")
  }

  const vote = () => {
    console.log("vote")
  }

  return (
    <Modal 
      isOpen={props.showModal} 
      onRequestClose={props.handleCloseModal} 
      appElement={document.getElementById('root')}
      >
        {console.log(props.showModal)}
      <div className="vote-container">
      <button onClick={props.handleCloseModal}>X</button>
      <h2>Vote {props.ohterUserName}'s personalities!</h2>
        <div className="option-box">
            <input type="text" list='mbti-options'onChange={setMbtiType}/>
            <datalist id="mbti-options">
                {MBTI_TYPE.map((mbti,i) => {return (
                    <option value={mbti} key={i}/>
                )})}
            </datalist>
        </div>
        <div className="option-box">
        <input type="text" list='enneagram-options' onChange={setEnneagram}/>
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
