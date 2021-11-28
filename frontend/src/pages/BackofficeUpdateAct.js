import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import CreateActivityForm from '../components/CreateActivityForm';

const BackofficeUpdateAct = () => {
    const params = useParams();
    const [activityInfo, setActivityInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/activities/` + params.activity_id);
            const json = await res.json();
            setActivityInfo(json.activity);
        };

        fetchData();
    }, [params.activity_id, setActivityInfo]);

    if (!activityInfo) {
        return (<div>Aan het laden...</div>);
    }

    return (
        <>
            <Navbar />
            <main class="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <CreateActivityForm activity={activityInfo} />
                </div>
            </main>
        </>
    );
}

export default BackofficeUpdateAct;

