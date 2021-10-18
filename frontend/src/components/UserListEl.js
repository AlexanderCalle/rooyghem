import React from 'react';
import '../style/backoffice.css';

const UserListEl = (props) => {
    const updateLink = "/backoffice/users/update/" + props.user.user_id;
    const deleteLink = "/backoffice/users/delete/" + props.user.user_id;

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