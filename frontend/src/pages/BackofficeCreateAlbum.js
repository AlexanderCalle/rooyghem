import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../style/backoffice.css';
import BackofficeMenu from '../components/BackofficeMenu';
import CreateAlbumForm from '../components/CreateAlbumForm';

const BackofficeCreateAlbum = () => {

    return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <CreateAlbumForm />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default BackofficeCreateAlbum;