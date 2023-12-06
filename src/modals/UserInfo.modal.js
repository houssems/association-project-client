import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from 'react';

import useAuth from "../hooks/useAuth";

function UserInfoModal(props) {

    const {user} = useAuth();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
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
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" required defaultValue={user.email}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control type="text" placeholder="firstname" required defaultValue={user.firstName}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>lastName</Form.Label>
                            <Form.Control type="text" placeholder="firstname" required defaultValue={user.lastName}/>
                        </Form.Group>
                        <Button type="submit" onClick={props.onHide}>Update</Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default UserInfoModal;