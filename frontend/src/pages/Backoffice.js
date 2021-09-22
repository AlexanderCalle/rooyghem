import React, {useEffect, useState} from 'react';
import Auth from '../middleware/auth';

const BackofficePage = () => {

    const user = JSON.parse(localStorage.getItem('tokens'));

    const logout = async () => {
        const result = await Auth.logout();
        if(result) {
            window.location.reload();
        }
    }

    return (
        <>
            <p>{user.username}</p>
            <button onClick={logout}>
                Logout
            </button>
        </>
    )
}

export default BackofficePage;