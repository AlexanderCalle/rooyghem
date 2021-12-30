import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';

const BackofficeAlbumChecker = () => {

    const [albums, setAlbums] = useState([]);
    const [message, setMessage] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/albums/checker/all`, { withCredentials: true })
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
                        {message === "albums" ? (
                            <>
                                {albums.map(album => (
                                    <a href={"/backoffice/albums/check/" + album.album_id}>
                                        <div class="interfaceinfo">
                                            <div class="interfaceinfo-inner">
                                                <img src={`${process.env.REACT_APP_BACKEND_HOST}/public/images/album1.svg`} width="30" height="auto" />
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
