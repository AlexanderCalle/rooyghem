import React, { useState, useEffect } from 'react';
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
            // TODO: make request
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
                <input id="title" type="text" name="name" placeholder="Naam album..." />
                <br />
                <label for="description">Beschrijving </label><br />
                <input id="description" type="text" name="description" placeholder="Beschrijving..." />
                <br />
                <label for="start_time">Start activiteit </label> <br />
                <input id="activity_start" type="date" name="activity_start" />
                <br />
                <label for="end_time">Einde activiteit </label><br />
                <input id="activity_end" type="date" name="activity_end" />
                <br />
                <button type="submit">Maak album</button>
            </form>
        </div>
    )
}

export default CreateAlbumForm;