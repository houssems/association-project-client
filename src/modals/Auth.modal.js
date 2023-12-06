import {Button, Form, Modal} from "react-bootstrap";
import React, { useCallback, useState } from 'react';
import {LoginSocialFacebook} from "reactjs-social-login";
import {
    FacebookLoginButton,
} from 'react-social-login-buttons';
import useAuth from "../hooks/useAuth";

function AuthModal(props) {

    const { login, isAuthenticated} = useAuth();
    const [validated, setValidated] = useState(false);

    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState();

    const onLogoutSuccess = useCallback(() => {
        setProfile(null);
        setProvider('');
        alert('logout success');
    }, []);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const handleFacebook = async ({ provider, data }) => {
        console.log({ provider, data });
        const result = await login(provider, {accessToken: data.accessToken});
        if (result) {
            props.onHide();
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    LogIn
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" required/>
                    </Form.Group>
                    <Button type="submit" onClick={props.onHide}>Connect</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>

                <LoginSocialFacebook
                    appId={process.env.REACT_APP_FB_APP_ID || ''}
                    fieldsProfile={
                        'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                    }
                    onLogoutSuccess={onLogoutSuccess}
                    redirect_uri={"https://localhost:3006/homepage"}
                    onResolve={handleFacebook}
                    onReject={err => {
                        console.log(err);
                    }}
                >
                    <FacebookLoginButton />
                </LoginSocialFacebook>
            </Modal.Footer>
        </Modal>
    );
}

export default AuthModal;