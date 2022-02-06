import React, {useState} from "react";
import Button from '@mui/material/Button';
import Modal from 'react-modal';
import Login from "./Login";

Modal.setAppElement("#root");

export default function LoginBtn() {
    const [isModalOpen, setIsOpen] = useState(false);

    const toggleModal = () =>{
        setIsOpen(!isModalOpen);
    }

    return (
        <>
        <Button onClick={toggleModal}>Login</Button>
        <Modal isOpen={isModalOpen}>
            <button onClick={toggleModal}>Close modal</button>
            <Login/>
        </Modal>
        </>
    );
}
