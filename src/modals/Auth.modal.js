import {Modal} from "react-bootstrap";

import UserLoginForm from "../components/user/UserLoginForm";
import {useState} from "react";
import UserRegisterForm from "../components/user/UserRegisterForm";
import {AuthTabEnums} from "../enums/AuthTab.enums";



function AuthModal(props) {

    const [currentTab, setCurrentTab] = useState(AuthTabEnums.LOGIN);

    const switchToTab = (newTab) => {
        setCurrentTab(newTab);
    }

    return (<Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {currentTab}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {currentTab === AuthTabEnums.LOGIN && <UserLoginForm switchToTab={switchToTab} onHide={props.onHide}/>}
                {currentTab === AuthTabEnums.SIGN_UP && <UserRegisterForm onSubmit={props.onHide}/>}
            </Modal.Body>
        </Modal>);
}

export default AuthModal;