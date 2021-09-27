import React from 'react';
import Auth from '../middleware/auth';

const BackofficeMenu = () => {
    const user = JSON.parse(localStorage.getItem('tokens'));
    const isAdmin = user && user.is_admin;
    const profileLink = '/profile/' + user.user_id;
    console.log(user);
    const adminOptions = () => {
        if (isAdmin) {
            return(
                <>
                <a href="/newsfeed">Nieuwtjes</a>
                </>
            );
        } else {
            return(<></>);
        }
    }

    const logout = async () => {
        const result = await Auth.logout();
        if(result) {
            window.location.reload();
        }
    }

    return(
        <div id="backofficenavbar">
            <a href="/backoffice/activities">Activiteiten</a>
            <a href="/backoffice/vk">Verhalend Kader</a>
            <a href={profileLink}>Mijn Profiel</a>  
            {adminOptions()}
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default BackofficeMenu;