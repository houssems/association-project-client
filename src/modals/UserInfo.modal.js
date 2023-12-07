import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from 'react';

import useAuth from "../hooks/useAuth";
import UserInfoForm from "../components/user/UserInfoForm";

function UserInfoModal(props) {

    const {user} = useAuth();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (newUser) => {
        console.log(newUser);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    User Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user && (
                    <UserInfoForm userObj={user} submit={handleSubmit} isEditing={true}/>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default UserInfoModal;