import React, {useEffect, useState} from 'react';
import Auth from '../middleware/auth';
import BackofficeMenu from '../components/BackofficeMenu';
import '../style/backoffice.css';

const BackofficePage = () => {

    const user = JSON.parse(localStorage.getItem('tokens'));

    return (
        <>
            <BackofficeMenu/>
        </>
    )
}

export default BackofficePage;