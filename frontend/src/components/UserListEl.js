import React, {useState} from 'react';
import '../style/backoffice.css';

const UserListEl = (props) => {
    const [updateLink, setUpdateLink] = useState(null);
    const [deleteLink, setDeleteLink] = useState(null);
    
    if (props.isAspi && (!updateLink || !deleteLink)) {
        setUpdateLink("/backoffice/aspiranten/update/" + props.user.aspi_id);
        setDeleteLink("/backoffice/aspiranten/delete/" + props.user.aspi_id);
    } else if (!updateLink || !deleteLink) {
        setUpdateLink("/backoffice/users/update/" + props.user.user_id);
        setDeleteLink("/backoffice/users/delete/" + props.user.user_id);
    }

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