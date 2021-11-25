import React, { useEffect } from 'react';
import axios from 'axios';

const AlbumListEl = (props) => {

    useEffect(() => {
        console.log(props);
    }, [props]);

    const deleteAlbum = (album_id) => {
        axios.delete('http://localhost:2000/albums/delete/' + album_id)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
    }

    return (
        <div class="interfaceinfo">
            <div class="interfaceinfo-inner">
                <img src={"http://localhost:2000/public/images/album1.svg"} width="30" height="auto" />
                <p><a href={"/backoffice/albums/album/" + props.album.album_id}>{props.album.name}</a></p>
                <div class="albumButtons">
                    <a href={"/albums/update/" + props.album.album_id}>bewerk</a>
                    {/* TODO: delete knop album */}
                    <a onClick={() => deleteAlbum(props.album.album_id)}>delete </a>
                </div>
            </div>
        </div>
    )
}

export default AlbumListEl;