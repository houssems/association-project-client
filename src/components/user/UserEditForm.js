import UserInfoForm from "./UserInfoForm";

const UserEditForm = ({onSubmit, userObj}) => (
    <UserInfoForm onSubmit={onSubmit} userObj={userObj} isEditing={true}/>
);

export default UserEditForm;