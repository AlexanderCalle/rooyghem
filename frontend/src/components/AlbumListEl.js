import React, { useEffect } from 'react';
import axios from 'axios';

const AlbumListEl = (props) => {

    useEffect(() => {
        console.log(props);
    }, [props]);

    const deleteAlbum = (album_id) => {
        axios.delete(`http://${process.env.REACT_APP_BACKEND_HOST}/albums/delete/` + album_id)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
    }

    return (
        <div class="interfaceinfo">
            <div class="interfaceinfo-inner">
                <img src={`http://${process.env.REACT_APP_BACKEND_HOST}/public/images/album1.svg`} width="30" height="auto" />
                <p><a href={"/backoffice/albums/album/" + props.album.album_id}>{props.album.name}</a> ({props.album.checked === 1 ? "checked" : "nog niet gechecked"})</p>
                <div class="albumButtons">
                    <a href={"/backoffice/albums/album/update/" + props.album.album_id}>bewerk</a>
                    <a onClick={() => deleteAlbum(props.album.album_id)}>delete </a>
                </div>
            </div>
        </div>
    )
}

export default AlbumListEl;