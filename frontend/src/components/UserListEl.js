import React from 'react';
import '../style/backoffice.css';

const UserListEl = (props) => {
    const updateLink = "/backoffice/users/" + props.user.user_id + "/update";
    const deleteLink = "/backoffice/users/" + props.user.user_id + "/delete";    
    

    return (
        <div class="interfaceinfo">
            <p>{props.user.firstname} {props.user.lastname}</p>
            <div class="buttons">
                <a href={updateLink}>Bewerk</a>
                <a href={deleteLink}>Verwijder</a>
            </div>
        </div>
    );
};

export default UserListEl;