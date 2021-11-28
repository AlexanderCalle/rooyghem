import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import CreateActivityForm from '../components/CreateActivityForm';

const BackofficeActivityDelete = (props) => {
    const params = useParams();
    const [activityInfo, setActivityInfo] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}/activities/` + params.activity_id);
            const json = await res.json();
            setActivityInfo(json.activity);
        };

        fetchData();
    }, [params.activity_id, setActivityInfo]);

    if (!activityInfo) {
        return (<div>Aan het laden...</div>);
    }

    const deleteActivity = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}/activities/delete/` + activityInfo.activity_id, { 'credentials': 'include' });
        window.location = '/backoffice/activities';
    };
    console.log(activityInfo);
    return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <CreateActivityForm activity={activityInfo} readOnly={true} />
                    <button onClick={deleteActivity}>Verwijder activiteit</button>
                </div>
            </main>
        </>
    );
};

export default BackofficeActivityDelete;