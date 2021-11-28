import React, { useEffect, useState } from 'react';
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../style/backoffice.css';

const BackofficeVkPage = () => {
    const [story, setStory] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/vk`, { 'credentials': 'include' });
            const json = await res.json();
            if (res.statusCode === 401) {
                setMessage("Authorisatie mislukt, probeer opnieuw in te loggen");
            } else {
                setStory(json.vk);
            }
        };

        fetchData();
    }, [setStory, setMessage]);

    const updateVk = async e => {
        e.preventDefault();
        const data = {
            story
        }

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/vk`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.statuscode === 200) {
                    setMessage(data.message)
                } else if (data.statuscode === 401) {
                    console.log(data.error);
                    setMessage("Er is een authorisatiefout: " + data.error);
                } else {
                    console.log(data.error);
                    setMessage("Er is een fout opgetreden: " + data.error);
                }
            })
    };

    if (!story) {
        return (
            <>
                <Navbar />
                <main class="container" id="backofficecontainer">
                    <BackofficeMenu />
                    {message ? <p>{message}</p> : <p>Aan het laden...</p>}
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <div id="vkForm">
                        <p>{message}</p>
                        <h1>Verhalend kader</h1>
                        <ReactQuill theme="snow" value={story} onChange={setStory} />
                        <button onClick={updateVk}>Post vk</button>

                    </div>
                </div>
            </main>
        </>
    );
};

export default BackofficeVkPage;