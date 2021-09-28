import React, {useState, useEffect} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateNewsfeedForm = (props) => {
    const isUpdateForm = props.newsfeed !== undefined;
    const [title, setTitle] = useState(isUpdateForm ? props.newsfeed.title : "");
    const [description, setDescription] = useState(isUpdateForm ? props.newsfeed.description : "");
    const [startPublication, setStartPublication] = useState(isUpdateForm ? props.newsfeed.start_publication.split('T')[0] : "");
    const [endPublication, setEndPublication] = useState(isUpdateForm ? props.newsfeed.end_publication.split('T')[0]: "");
    const [image, setImage] = useState(null);

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
    }

    return(
        <div id="creationform">
            <h1>Maak nieuwtje</h1>
            <form onSubmit={isUpdateForm? update : create}>
                <fieldset disabled={props.readOnly? true: false}>
                    <label for="title">Titel </label>
                    <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" placeholder="Titel..." />
                    <br />
                    <label for="description">Beschrijving </label>
                    <br />
                    <ReactQuill onChange={setDescription} value={description} theme="snow"/>
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
                    {props.readOnly? <></>:
                        <button type="submit">Maak nieuwtje</button>}
                </fieldset>
            </form>
        </div>
    );

};

export default CreateNewsfeedForm;