import UserInfoForm from "./UserInfoForm";
import axios from "../../utils/axios";

const UserRegisterForm = ({submit}) => {

    const onSubmit = async (user) => {
        const response = await axios.post('/v1/auth/email/register', user);
        console.log(response);
    }

    return (
        <UserInfoForm submit={onSubmit}/>
    );
}

export default UserRegisterForm;