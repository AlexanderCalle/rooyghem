import React, {useState, useEffect} from 'react'

const CreateNewsfeedForm = (props) => {
    const isUpdateForm = props.newsfeed !== undefined;
    const [title, setTitle] = useState(isUpdateForm ? props.newsfeed.title : "");
    const [description, setDescription] = useState(isUpdateForm ? props.newsfeed.description : "");
    const [startPublication, setStartPublication] = useState(isUpdateForm ? props.newsfeed.start_publication.split('T')[0] : "");
    const [endPublication, setEndPublication] = useState(isUpdateForm ? props.newsfeed.end_publication.split('T')[0]: "");
    const [image, setImage] = useState(null);

    console.log(startPublication);

    const makeFormData = () => {
        const formData = new FormData();
        
        formData.append("title", title);
        formData.append("description", description);
        formData.append("start_publication", startPublication);
        formData.append("end_publication", endPublication);
        formData.append("image", image);

        return formData;
    }

    const create = (e) => {

        e.preventDefault();
        const formData = makeFormData();
        
        const requestOptions = {
            method: 'POST',
            credentials: 'include',

            body: formData
        }

        fetch('http://localhost:2000/newsfeeds/create', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.statuscode === 200) {
                window.location = "/backoffice/newsfeed"
            } else {
                console.log(data.error);
            }
        });

    }

    const update = (e) => {
        e.preventDefault();
        const formData = makeFormData();
        
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',

            body: formData
        }

        fetch('http://localhost:2000/newsfeeds/update/' + props.newsfeed.feed_id, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.statuscode === 200) {
                window.location = "/backoffice/newsfeed"
            } else {
                console.log(data.error);
            }
        });

        // fetch('https://httpbin.org/anything', requestOptions).then(data => data.json()).then(data => console.log(data));
    }

    return(
        <div id="creationform">
            <h1>Maak nieuwtje</h1>
            <form onSubmit={isUpdateForm? update : create}>
                <label for="title">Titel </label>
                <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" placeholder="Titel..." />
                <br />
                <label for="description">Beschrijving </label>
                <br />
                <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} id="feedDescription" cols="120" rows="10">Beschrijving van het nieuwtje...</textarea>
                <br />
                <label for="start_publication">Start publicatie </label>
                <input id="start_publication" type="date" value={startPublication} onChange={e => setStartPublication(e.target.value)} name="start_publication" />
                <br />
                <label for="end_publication">Einde publicatie </label>
                <input id="end_publication" type="date" value={endPublication} onChange={e => setEndPublication(e.target.value)} name="end_publication" />
                <br />
                <label for="picture_path">Foto </label>
                <input  type="file" name="image" onChange={e => {
                    const file = e.target.files[0];
                    setImage(file);
                }}placeholder="Pad..." />
                <br />
                <button type="submit">Maak nieuwtje</button>
            </form>
        </div>
    );

};

export default CreateNewsfeedForm;