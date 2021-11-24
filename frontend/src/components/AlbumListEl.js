import React, { useEffect } from 'react';

const AlbumListEl = (props) => {

    useEffect(() => {
        console.log(props);
    }, [props]);

    return (
        <div class="interfaceinfo">
            <div class="interfaceinfo-inner">
                <img src={"http://localhost:2000/public/images/album1.svg"} width="50" height="auto" />
                <p><a href={"/backoffice/albums/album/" + props.album.album_id}>{props.album.name}</a></p>
                <div class="albumButtons">
                    <a href={"/albums/update/" + props.album.album_id}>bewerk</a>
                    {/* TODO: delete knop album */}
                    <a href="/albums/delete/<%= album.album_id %>">delete </a>
                </div>
            </div>
        </div>
    )
}

export default AlbumListEl;