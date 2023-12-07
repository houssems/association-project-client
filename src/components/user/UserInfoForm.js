import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";


const UserInfoForm = ({userObj, submit, isEditing}) => {

    const [validated, setValidated] = useState(false);

    const [user, setUser] = useState(userObj || {});

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        submit(user);
    };

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setUser({...user, [key]: value});
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Firstname</Form.Label>
                <Form.Control name="firstName"
                              type="text"
                              placeholder="firstName"
                              required
                              defaultValue={user.firstName}
                              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>lastName</Form.Label>
                <Form.Control name="lastName"
                              type="text"
                              placeholder="lastName"
                              required
                              defaultValue={user.lastName}
                              onChange={handleChange}/>
            </Form.Group>
            {!isEditing && (
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email"
                                  type="email"
                                  placeholder="name@example.com"
                                  required
                                  defaultValue={user.email}
                                  onChange={handleChange}
                    />
                </Form.Group>
            )}
            {isEditing && (
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="oldPassword"
                                  type="password"
                                  placeholder="old password"
                                  required
                                  onChange={handleChange}/>
                </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password"
                              type="password"
                              placeholder="password"
                              required
                              onChange={handleChange}/>
            </Form.Group>

            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default UserInfoForm;