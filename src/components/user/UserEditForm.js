import UserInfoForm from "./UserInfoForm";
import axios from "../../utils/axios";

const UserRegisterForm = ({submit}) => {

    const onSubmit = async (user) => {
        const response = await axios.post('/v1/auth/me', user);
        console.log(response);
    }

    return (
        <UserInfoForm submit={onSubmit} isEditing={true}/>
    );
}

export default UserRegisterForm;