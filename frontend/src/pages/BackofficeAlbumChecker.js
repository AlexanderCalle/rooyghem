import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';

const BackofficeAlbumChecker = () => {

    const [albums, setAlbums] = useState([]);
    const [message, setMessage] = useState();

    useEffect(() => {
        axios.get('http://localhost:2000/albums/checker', { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setAlbums(response.data.albums);
                    setMessage(response.data.albums ? "albums" : "Allemaal gecontroleerd!");
                }
            }).catch(err => {
                console.log(err);
            })
    }, []);

    if (!message) return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                Loading...
            </main>
        </>
    )

    return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                <BackofficeMenu />
                <div class="interface">
                    <h2>Albums</h2>
                    <div class="info">
                        {!message ? (
                            <>
                                {albums.map(album => (
                                    <a href={"/backoffice/albums/check/" + album.album_id}>
                                        <div class="interfaceinfo">
                                            <div class="interfaceinfo-inner">
                                                <img src={"http://localhost:2000/public/images/album1.svg"} width="30" height="auto" />
                                                <p>{album.name}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </>
                        ) : message}
                    </div>
                </div>
            </main>
        </>
    )
}

export default BackofficeAlbumChecker;