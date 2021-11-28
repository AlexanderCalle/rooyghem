import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import CreateNewsfeedForm from '../components/CreateNewsfeedForm'

const BackofficeNewsfeedCreate = () => {
    const params = useParams();
    const [newsfeedInfo, setNewsfeedInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/newsfeeds/' + params.newsfeed_id);
            const json = await res.json();
            setNewsfeedInfo(json.newsfeed);
        };

        fetchData();
    }, [setNewsfeedInfo, params.newsfeed_id]);
    
    if(!newsfeedInfo) {
        return(
            <>
            <p>Aan het laden...</p>
            </>
        )
    }

    const deleteNewsfeed = () => {

        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
        }

        fetch("http://localhost:2000/newsfeeds/delete/" + params.newsfeed_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.statuscode === 200) { 
                    window.location = "/backoffice/newsfeed";
                }
            })
    }

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <CreateNewsfeedForm newsfeed={newsfeedInfo} readOnly={true}/>
                    <button onClick={deleteNewsfeed}>Verwijder nieuwtje</button>
                </div>
            </main>
        </>
    )
}

export default BackofficeNewsfeedCreate;