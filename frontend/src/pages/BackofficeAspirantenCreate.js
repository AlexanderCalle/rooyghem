import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import BackofficeMenu from '../components/BackofficeMenu';
import '../style/backoffice.css'
import CreateAspirantForm from '../components/CreateAspirantFrom';

function BackofficeAspirantenCreatePage() {

    return(
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <CreateAspirantForm />
            </main>
        </>
    );
}

export default BackofficeAspirantenCreatePage;