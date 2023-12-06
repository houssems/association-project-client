import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {AuthModal, UserInfoModal} from "../../modals";
import useAuth from "../../hooks/useAuth";

import "./userInfo.css";

const UserInfo = () => {
    const {isAuthenticated, getInitials} = useAuth();
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [userInfoModalShow, setUserInfoModalShow] = useState(false);

    console.log(isAuthenticated)
    return (
        <>
            {!isAuthenticated && (
                <div className={"homepage__user__login"} onClick={() => setLoginModalShow(true)}>
                    <div className={"homepage__user__login__icon"}>
                        <FontAwesomeIcon icon={faRightToBracket}/>
                    </div>
                </div>
            )}

            {isAuthenticated && (
                <div className={"homepage__user__login"} onClick={() => setUserInfoModalShow(true)}>
                    <div className={"homepage__user__login__icon"}>
                        <div>
                            <FontAwesomeIcon icon={faUser}/>
                            <p>{getInitials()}</p>
                        </div>
                    </div>
                </div>)}
            <AuthModal show={loginModalShow}
                       onHide={() => setLoginModalShow(false)}/>
            <UserInfoModal show={userInfoModalShow}
                           onHide={() => setUserInfoModalShow(false)}/>
        </>

    );
}

export default UserInfo;