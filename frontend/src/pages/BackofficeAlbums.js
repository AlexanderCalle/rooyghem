import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlbumListEl from '../components/AlbumListEl';
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';

const BackofficeAlbums = () => {

    const [albums, setAlbums] = useState([]);
    const { group_id } = JSON.parse(localStorage.getItem('tokens'));

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}/albums/groups/albums/` + group_id, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setAlbums(response.data.albums);
                    console.log(response.data);
                } else {
                    console.log("no Success response");
                }
            })
    }, [group_id]);

    if (!albums) return (
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
                        {albums.map(album => (
                            <AlbumListEl album={album} />
                        ))}
                    </div>
                    <a class="addLink" href="/backoffice/albums/create">Nieuw album</a>
                </div>
            </main>
        </>
    )
}

export default BackofficeAlbums;