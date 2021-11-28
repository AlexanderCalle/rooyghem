import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import BackofficeMenu from '../components/BackofficeMenu';
import '../style/backoffice.css'
import CreateUsersForm from '../components/CreateUsersForm';

function BackofficeUsersCreate() {

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <CreateUsersForm />
            </main>
        </>
    )
}

export default BackofficeUsersCreate;
