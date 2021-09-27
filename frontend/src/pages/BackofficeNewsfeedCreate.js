import React, {useState} from 'react'
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'

function BackofficeNewsfeedCreate() {

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [startPublication, setStartPublication] = useState(null);
    const [endPublication, setEndPublication] = useState(null);
    const [image, setImage] = useState(null);

    const create = (e) => {

        e.preventDefault();
        
        const formData = new FormData();
        
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("startPublication", startPublication);
        formData.append("endPublication", endPublication);

        
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'multipart/form-data', "Access-Control-Allow-Origin": "*"},

            body: formData
        }

        fetch('http://localhost:2000/newsfeeds/create', requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.statuscode === 200) {
                window.location = "/backoffice/newsfeed"
            } else {
                console.log(data.error);
            }
        })
        
    }

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
       
                    <div id="creationform">
                        <h1>Maak nieuwtje</h1>
                        <form onSubmit={create}>
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
                            <input  type="file" name="image" onChange={e => setImage(e.target.files[0])}placeholder="Pad..." />
                            <br />
                            <button type="submit">Maak nieuwtje</button>
                        </form>
                    </div>

                </div>
            </main>
        </>
    )
}

export default BackofficeNewsfeedCreate;
