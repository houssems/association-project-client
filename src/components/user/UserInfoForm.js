import {Button, Form, InputGroup} from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';

import "./UserInfoForm.css";
import axios from "../../utils/axios";
import useToast from "../../hooks/useToast";

const UserInfoForm = ({userObj, isEditing, onSubmit}) => {

    const { addToast } = useToast();

    const handleSubmit = async (user, {
        setSubmitting,
        setFieldError,
    }) => {
        try {
            const result = !isEditing ? await axios.post('/v1/auth/email/register', user) : await axios.patch('/v1/auth/me', user);
            if (onSubmit && result.status === 204) {
                onSubmit();
                addToast({
                    title: 'Welcome to our association',
                    content: 'Registration almost complete please check your email to confirm your Account'
                })

            }
        } catch (errors) {
            if (errors && errors.hasOwnProperty('errors')) {
                for (const errorField in errors.errors) {
                    const errorValue = errors.errors[errorField];
                    setFieldError(errorField, errorValue);
                }
                setSubmitting(false);
            }
        }
    };

    const {Formik} = formik;

    let baseFormValidationSchema = {
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        password: yup.string().required(),
    };

    if (isEditing) {
        baseFormValidationSchema = {
            ...baseFormValidationSchema,
            oldPassword: yup.string().required(),
        }
    } else {
        baseFormValidationSchema = {
            ...baseFormValidationSchema,
            email: yup.string().email().required(),
        }
    }


    const schema = yup.object().shape(baseFormValidationSchema);


    return (<Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={userObj || {}}
    >
        {({handleSubmit, handleChange, values, touched, errors}) => (
            <Form noValidate onSubmit={handleSubmit} className={"userInfo__form"}>
                <Form.Group className="mb-3 position-relative" controlId="userInfoForm.firstName">
                    <Form.Label>Firstname</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="firstName"
                                      type="text"
                                      placeholder="firstName"
                                      value={values.firstName}
                                      onChange={handleChange}
                                      isValid={touched.firstName && !errors.firstName}
                                      isInvalid={!!errors.firstName}/>
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="userInfoForm.lastName">
                    <Form.Label>lastName</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="lastName"
                                      type="text"
                                      placeholder="lastName"
                                      value={values.lastName}
                                      onChange={handleChange}
                                      isValid={touched.lastName && !errors.lastName}
                                      isInvalid={!!errors.lastName}/>
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                {!isEditing && (<Form.Group className="mb-3" controlId="userInfoForm.email">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="email"
                                      type="email"
                                      placeholder="name@example.com"
                                      value={values.email}
                                      onChange={handleChange}
                                      isValid={touched.email && !errors.email}
                                      isInvalid={!!errors.email}/>
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.email}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>)}
                {isEditing && (<Form.Group className="mb-3" controlId="userInfoForm.oldPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="oldPassword"
                                      type="password"
                                      placeholder="old password"
                                      onChange={handleChange}
                                      isValid={touched.oldPassword && !errors.oldPassword}
                                      isInvalid={!!errors.oldPassword}/>
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.oldPassword}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>)}
                <Form.Group className="mb-3" controlId="userInfoForm.password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="password"
                                      type="password"
                                      placeholder="password"
                                      onChange={handleChange}
                                      isValid={touched.password && !errors.password}
                                      isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type="invalid" tooltip>
                            {errors.password}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Button type="submit">Submit</Button>
            </Form>
        )}
    </Formik>);
}

export default UserInfoForm;