import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/group.css";
import "../style/modal.css";

const AlbumPhotos = () => {

    const { album_id } = useParams();

    const [album, setAlbum] = useState();
    const [pictures, setPictures] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [imageShow, setImageShow] = useState();

    useEffect(() => {
        axios.get(`http://localhost:2000/albums/album/${album_id}`)
            .then(response => {
                if (response.status === 200) {
                    console.log("data");
                    console.log(response.data.pictures);
                    setAlbum(response.data.album)
                    setPictures(response.data.pictures)
                }
            }).catch(error => {
                console.log(error);
            })
    }, [album_id]);

    const NextPic = (newIdx) => {
        if (newIdx < 0) {
            newIdx = pictures.length - 1;
        } else if (newIdx >= pictures.length) {
            newIdx = 0;
        }

        setImageShow({ url: pictures[newIdx], idx: newIdx })
    }

    useEffect(() => {
        console.log(showModal, imageShow);
    }, [showModal, imageShow])

    if (!album) return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                <p>Loading...</p>
            </main>
            <Footer />
        </>
    )

    return (
        <>
            <Navbar />
            <main class="container" id="groupcontainer">
                <div className="interfacePhoto">
                    <h2>Fotos in {album.name}</h2>
                    <div class="infoPhoto">
                        {pictures.map(pic => (
                            <a key={pic} onClick={() => {
                                setShowModal(true)
                                setImageShow({
                                    url: pic, idx: pictures.indexOf(pic)
                                })
                            }} class="interfaceinfoPhoto">
                                <img id="myImg" src={pic} />
                            </a>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            {
                showModal && (
                    <div id="myModal" class="modal">
                        <span class="close" onClick={() => setShowModal(false)}>&times;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="nextDown" onClick={() => NextPic(imageShow.idx - 1)}>&#10094;</span>
                        <img class="modal-content" src={imageShow.url} />
                        <span class="nextUp" onClick={() => NextPic(imageShow.idx + 1)}>&#10095; </span>
                    </div>
                )
            }
        </>
    )
}

export default AlbumPhotos
