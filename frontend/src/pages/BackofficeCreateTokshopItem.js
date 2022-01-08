import React from 'react';
import Navbar from '../components/Navbar';
import BackofficeMenu from '../components/BackofficeMenu';
import '../style/backoffice.css'
import CreateTokshopItemForm from '../components/CreateTokshopItemForm';

function BackofficeCreateTokshopitemPage() {

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <CreateTokshopItemForm />
            </main>
        </>
    )
}

export default BackofficeCreateTokshopitemPage;