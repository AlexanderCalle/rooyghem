import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackofficeMenu from '../components/BackofficeMenu';
import axios from 'axios';
import ModalAddPhotos from '../components/ModalAddPhotos';

const BackofficeAlbumPhoto = () => {

    const { album_id } = useParams();
    const [album, setAlbum] = useState();
    const [pictures, setPictures] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/albums/album/` + album_id)
            .then((response) => {
                if (response.status === 200) {
                    setAlbum(response.data.album);
                    setPictures(response.data.pictures);
                    console.log(response.data.pictures);
                }
            }).catch((error) => {
                console.log(error);
            })
    }, [album_id]);

    const deletePic = (album_id, pic_id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/albums/album/${album_id}/pic/delete/${pic_id}`)
            .then(response => {
                if (response.status === 200) {
                    const tempPics = pictures;
                    console.log(tempPics);
                    setPictures(tempPics.filter(pic => pic !== `http://${process.env.REACT_APP_BACKEND_HOST}/albums/pictures/` + pic_id));
                }
            }).catch(err => {
                console.log(err);
            })
    }

    if (!album) return "Loading..."

    return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                <BackofficeMenu />
                <div class="interfacePhoto">
                    <h2 className="font-bold text-xl">Fotos in {album.name}</h2>
                    <div class="infoPhoto">
                        {pictures.map(pic => (
                            <div class="interfaceinfoPhoto">
                                <img src={pic} width="150" height="auto" />
                                <br />
                                <a onClick={() => deletePic(album_id, pic.split('/')[pic.split('/').length - 1])}>delete </a>
                            </div>
                        ))}
                    </div>
                    <a class="addLink" onClick={() => setShowModal(!showModal)}>Voeg Foto('s) toe</a>
                </div>
            </main>

            {showModal && (
                <ModalAddPhotos album={album} showModal={showModal} setShowModal={setShowModal} />
            )}
        </>
    )
}

export default BackofficeAlbumPhoto;