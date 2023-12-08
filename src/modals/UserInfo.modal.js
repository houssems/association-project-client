import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from 'react';

import useAuth from "../hooks/useAuth";
import UserEditForm from "../components/user/UserEditForm";

function UserInfoModal({onSubmit}) {

    const {user} = useAuth();

    return (
        <Modal
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
                    <UserEditForm userObj={user} onSubmit={onSubmit}/>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default UserInfoModal;