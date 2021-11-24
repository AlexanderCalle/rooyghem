import React from 'react';
import Auth from '../middleware/auth';

const BackofficeMenu = () => {
    const user = JSON.parse(localStorage.getItem('tokens'));
    const isAdmin = user && user.is_admin;

    const adminOptions = () => {
        if (isAdmin) {
            return (
                <>
                    <a href="/backoffice/newsfeed">Nieuwtjes</a>
                    <a href="/backoffice/wafelbak/orders">Wafelbak bestellingen</a>
                    <a href="/backoffice/users">Gebruikers</a>
                    <a href="/backoffice/activities/allactivities">Alle activiteiten</a>
                    <a href="/backoffice/vk/allvk">Alle vk's</a>
                </>
            );
        } else {
            return;
        }
    }

    const logout = async () => {
        const result = await Auth.logout();
        if (result) {
            window.location.reload();
        }
    }

    return (
        <div id="backofficenavbar">
            <a href="/backoffice/activities">Activiteiten</a>
            <a href="/backoffice/albums">Albums</a>
            <a href="/backoffice/vk">Verhalend Kader</a>
            <a href="/backoffice/profile">Mijn Profiel</a>
            {adminOptions()}
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default BackofficeMenu;