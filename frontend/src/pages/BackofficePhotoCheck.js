import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackofficeMenu from '../components/BackofficeMenu';

const BackofficePhotoCheck = () => {

    const { album_id } = useParams();

    const [album, setAlbum] = useState({});
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/albums/check/${album_id}`)
            .then(response => {
                if (response.status === 200) {
                    setAlbum(response.data.album);
                    setPictures(response.data.pictures);
                }
            })
    }, [album_id]);

    const deletePic = (pic_id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/albums/album/${album_id}/pic/delete/${pic_id}`)
            .then(response => {
                if (response.status === 200) {
                    const tempPics = pictures;
                    console.log(tempPics);
                    setPictures(tempPics.filter(pic => pic.pictures_id !== pic_id));
                }
            }).catch(err => {
                console.log(err);
            })
    }

    const approveAlbum = () => {

        const token = JSON.parse(localStorage.getItem('tokens'));

        axios.post(`${process.env.REACT_APP_BACKEND_HOST}/albums/check/${album_id}/checked`, {
            user_id: token.user_id,
        }).then(response => {
            if (response.status === 200) {
                window.location.href = '/backoffice/albums/checker'
            }
        })
    }

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
                                <img src={`${process.env.REACT_APP_BACKEND_HOST}/albums/pictures/${pic.pictures_id}`} width="150" height="auto" />
                                <br />
                                <a onClick={() => deletePic(pic.pictures_id)}>delete</a>
                            </div>
                        ))}
                    </div>
                    <a class="addLink" onClick={approveAlbum} >Goedkeuren</a>
                </div>
            </main>
        </>
    )

}

export default BackofficePhotoCheck;