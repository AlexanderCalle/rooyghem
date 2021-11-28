import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/message.css";

const CreateAlbumForm = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [activityStart, setActivityStart] = useState("");
    const [activityEnd, setActivityEnd] = useState("");
    const { group_id } = JSON.parse(localStorage.getItem('tokens'));
    const [message, setMessage] = useState(null);

    const submitForm = (e) => {
        e.preventDefault();
        if (title && activityStart && activityEnd) {

            const data = {
                name: title,
                description: description,
                activity_start: activityStart,
                activity_end: activityEnd,
                group_id: group_id,
            }

            axios.post(`http://${process.env.REACT_APP_BACKEND_HOST}/albums/create`, data)
                .then(response => {
                    if (response.status === 201) {
                        window.location.href = '/backoffice/albums/album/' + response.data.album_id;
                    }
                })
        } else {
            setMessage("Vul alles in!")
        }
    }

    return (
        <div id="creationform">
            <h1>Album maken</h1>

            {message && (
                <div className="errorMessage">{message}</div>
            )}

            <form onSubmit={e => submitForm(e)}>
                <label for="title">Naam Album</label> <br />
                <input id="title" type="text" name="name" value={title} onChange={e => setTitle(e.target.value)} placeholder="Naam album..." />
                <br />
                <label for="description">Beschrijving </label><br />
                <input id="description" type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Beschrijving..." />
                <br />
                <label for="start_time">Start activiteit </label> <br />
                <input id="activity_start" type="date" value={activityStart} onChange={e => setActivityStart(e.target.value)} name="activity_start" />
                <br />
                <label for="end_time">Einde activiteit </label><br />
                <input id="activity_end" type="date" value={activityEnd} onChange={e => setActivityEnd(e.target.value)} name="activity_end" />
                <br />
                <button type="submit">Maak album</button>
            </form>
        </div>
    )
}

export default CreateAlbumForm;