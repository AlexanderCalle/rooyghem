import React, { useState } from 'react';
import AlbumListEl from '../components/AlbumListEl';
import BackofficeMenu from '../components/BackofficeMenu';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const BackofficeAlbums = () => {

    const [albums, setAlbums] = useState([]);

    return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                <BackofficeMenu />
                <div class="interface">
                    <h2>Albums</h2>
                    <div class="info">
                        {albums.map(album => (
                            <AlbumListEl album={album} />
                        ))}
                    </div>
                    <a class="addLink" href="/backoffice/albums/create">Nieuw album</a>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default BackofficeAlbums;