import React from 'react';
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import UsersForm from '../components/UsersForm';

const BackofficeUsersCreatePage = () => {

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <UsersForm />
                </div>
            </main>
        </>
    );
}

export default BackofficeUsersCreatePage;