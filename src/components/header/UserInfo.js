import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import {AuthModal, UserInfoModal} from "../../modals";
import useAuth from "../../hooks/useAuth";

import "./userInfo.css";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

const UserInfo = () => {
    const {logout, isAuthenticated, getInitials, getFullName} = useAuth();
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [userInfoModalShow, setUserInfoModalShow] = useState(false);
    const [detailsAccountPopoverDisplay, setDetailsAccountPopoverDisplay] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);


    const openEditModal = () => {
        setUserInfoModalShow(true);
        setDetailsAccountPopoverDisplay(false);
    }

    const openPopover = (event) => {
        setDetailsAccountPopoverDisplay(!detailsAccountPopoverDisplay);
        setTarget(event.target);
    };

    return (
        <>
            {!isAuthenticated && (
                <div className={"homepage__user__login"}
                     onClick={() => setLoginModalShow(true)}>
                    <div className={"homepage__user__login__icon"}>
                        <FontAwesomeIcon icon={faRightToBracket}/>
                    </div>
                </div>
            )}

            {isAuthenticated && (
                <>
                    <div className={"homepage__user__login"}
                         ref={ref}
                         onClick={openPopover}>
                        <div className={"homepage__user__login__icon"}>
                            <div>
                                <FontAwesomeIcon icon={faUser}/>
                            </div>
                        </div>
                        <p>{getInitials()}</p>
                        <Overlay
                            show={detailsAccountPopoverDisplay}
                            target={target}
                            placement="left"
                            container={ref}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained">
                                <Popover.Header as="h3">Welcome {getFullName()}</Popover.Header>
                                <Popover.Body>
                                    <div onClick={openEditModal}>Edit Account</div>
                                    <div onClick={logout}>Logout</div>
                                </Popover.Body>
                            </Popover>
                        </Overlay>

                    </div>
                </>

            )}
            <AuthModal show={loginModalShow}
                       onHide={() => setLoginModalShow(false)}/>
            <UserInfoModal show={userInfoModalShow}
                              onHide={() => setUserInfoModalShow(false)}/>
        </>

    );
}

export default UserInfo;