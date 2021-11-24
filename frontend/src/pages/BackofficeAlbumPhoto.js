import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackofficeMenu from '../components/BackofficeMenu';
import axios from 'axios';

const BackofficeAlbumPhoto = () => {

    const { album_id } = useParams();
    const [album, setAlbum] = useState();
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:2000/albums/album/' + album_id)
            .then((response) => {
                if (response.status === 200) {
                    setAlbum(response.data.album);
                    setPictures(response.data.pictures);
                    console.log(response.data.pictures);
                }
            }).catch((error) => {
                console.log(error);
            })
    }, [album_id])

    if (!album) return "Loading..."

    return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                <BackofficeMenu />
                <div class="interfacePhoto">
                    <h2>Fotos in {album.name}</h2>
                    <div class="infoPhoto">
                        {pictures.map(pic => (
                            <div class="interfaceinfoPhoto">
                                <img src={pic} width="150" height="auto" />
                                <br />
                                {/* TODO: delete button */}
                                <a href="/albums/album/<%= album.album_id %>/pic/delete/<%= pic.pictures_id %>">delete </a>
                            </div>
                        ))}
                    </div>
                    <a class="addLink" href="/albums/album/<%= album.album_id %>/add">Voeg Foto('s) toe</a>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default BackofficeAlbumPhoto;