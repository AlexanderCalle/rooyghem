import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BackofficeMenu from '../components/BackofficeMenu';
import { useParams } from 'react-router-dom';
import "../style/message.css";

const BackofficeAlbumUpdate = () => {

    const { album_id } = useParams();
    const [album, setAlbum] = useState();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/albums/${album_id}`)
            .then(response => {
                if (response.status === 200) {

                    const albumData = response.data.album;

                    albumData["activity_start"] = albumData["activity_start"].split('T')[0];
                    albumData["activity_end"] = albumData["activity_end"].split('T')[0];

                    setAlbum(response.data.album);
                }
            })
    }, [album_id])

    const submitUpdate = (e) => {
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem('tokens'));

        if (album.name && album.activity_start && album.activity_end) {
            axios.put(`${process.env.REACT_APP_BACKEND_HOST}/albums/update/${album_id}`, {
                album: album,
                group_id: token.group_id
            })
                .then(response => {
                    if (response.status === 200) {
                        window.location.href = "/backoffice/albums"
                    }
                }).catch(err => {
                    console.log(err);
                })
        } else {
            setMessage("Niet alles is ingevuld!")
        }

    }

    if (!album) return "Loading..."

    return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">

                <BackofficeMenu />

                <div id="backofficecreation">

                    <div id="creationform">
                        <h1>Album maken</h1>
                        {message && (
                            <div className="errorMessage">{message}</div>
                        )}
                        <form onSubmit={(e) => submitUpdate(e)}>
                            <label for="title">Naam Album</label> <br />
                            <input id="title" type="text" name="name" value={album.name} onChange={(e) => setAlbum({ ...album, name: e.target.value })} placeholder="Naam album..." />
                            <br />
                            <label for="description">Beschrijving </label><br />
                            <input id="description" type="text" name="description" value={album.description} onChange={(e) => setAlbum({ ...album, description: e.target.value })} placeholder="Beschrijving..." />
                            <br />
                            <label for="start_time">Start activiteit </label> <br />
                            <input id="activity_start" type="date" value={album.activity_start.split('T')[0]} onChange={(e) => setAlbum({ ...album, activity_start: e.target.value.split('T')[0] })} name="activity_start" />
                            <br />
                            <label for="end_time">Einde activiteit </label><br />
                            <input id="activity_end" type="date" value={album.activity_end.split('T')[0]} onChange={(e) => setAlbum({ ...album, activity_end: e.target.value.split('T')[0] })} name="activity_end" />
                            <br />
                            <button type="submit">update album</button>
                        </form>
                    </div>
                </div>

            </main>
        </>
    )
}

export default BackofficeAlbumUpdate;