import React, {useEffect, useState} from 'react';
import Auth from '../middleware/auth';

const BackofficePage = () => {

    const user = JSON.parse(localStorage.getItem('tokens'));

    return (
        <>
            <p>{user.username}</p>
        </>
    )
}

export default BackofficePage;