import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import CreateNewsfeedForm from '../components/CreateNewsfeedForm'

const BackofficeNewsfeedUpdate = () => {
    const params = useParams();
    const [newsfeedInfo, setNewsfeedInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/newsfeeds/' + params.newsfeed_id);
            const json = await res.json();
            setNewsfeedInfo(json.newsfeed);
        };

        fetchData();
        console.log(newsfeedInfo);
    }, [setNewsfeedInfo, params.newsfeed_id]);
    
    if(!newsfeedInfo) {
        return(
            <>
            <p>Aan het laden...</p>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <CreateNewsfeedForm newsfeed={newsfeedInfo}/>
                </div>
            </main>
        </>
    )
}

export default BackofficeNewsfeedUpdate;