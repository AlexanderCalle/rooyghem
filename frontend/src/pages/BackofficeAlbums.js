import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlbumListEl from '../components/AlbumListEl';
import BackofficeMenu from '../components/BackofficeMenu';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const BackofficeAlbums = () => {

    const [albums, setAlbums] = useState([]);
    const { group_id } = JSON.parse(localStorage.getItem('tokens'));

    useEffect(() => {
        console.log(group_id);
        axios.get('http://localhost:2000/albums/groups/' + group_id)
            .then((response) => {
                if (response.status === 200) {
                    setAlbums(response.data.albums);
                    console.log(response.data.albums);
                } else {
                    console.log("no Success response");
                }
            })
    }, [group_id]);

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