import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {LoginSocialFacebook} from "reactjs-social-login";
import {FacebookLoginButton} from "react-social-login-buttons";
import useAuth from "../../hooks/useAuth";
import {AuthTabEnums} from "../../enums/AuthTab.enums";


const UserLoginForm = ({switchToTab, onHide}) => {

    const { login} = useAuth();
    const [validated, setValidated] = useState(false);

    const handleFacebook = async ({ provider, data }) => {
        console.log({ provider, data });
        const result = await login(provider, {accessToken: data.accessToken});
        if (result && onHide) {
            onHide();
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" required/>
                </Form.Group>
                <Button type="submit">Connect</Button>
            </Form>
            <Button onClick={() => switchToTab(AuthTabEnums.SIGN_UP)}>Sign UP</Button>
            <div>Or</div>
            <LoginSocialFacebook
                appId={process.env.REACT_APP_FB_APP_ID || ''}
                fieldsProfile={
                    'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                }
                redirect_uri={"https://localhost:3006/homepage"}
                onResolve={handleFacebook}
                onReject={err => {
                    console.log(err);
                }}
            >
                <FacebookLoginButton />
            </LoginSocialFacebook>
        </div>
    );
}

export default UserLoginForm;