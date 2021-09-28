import React from 'react';
import '../style/backoffice.css';

const UserListEl = (props) => {
    const updateLink = "/backoffice/users/" + props.user.user_id + "/update";
    
    const deleteLink = async () => {
        const response = await fetch('http://localhost:2000/users/delete/single/' + props.user.user_id, {'credentials': 'include'});
        switch(response.statusCode) {
            case 200:
                window.location.reload();
                break;
            case 401:
                alert('Je hebt geen toegang om dit te doen!');
                break;
            case 400:
                alert('Er is een fout opgetreden probeer opnieuw');
                break;
            default:
                break;
        }
    };

    return (
        <div class="interfaceinfo">
            <p>{props.user.firstname} {props.user.lastname}</p>
            <div class="buttons">
                <a href={updateLink}>Bewerk</a>
                <a onClick={deleteLink}>Verwijder</a>
            </div>
        </div>
    );
};

export default UserListEl;