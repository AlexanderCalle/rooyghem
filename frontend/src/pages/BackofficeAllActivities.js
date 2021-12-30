import React, { useState, useEffect } from 'react';
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';
import ActivityListEl from '../components/ActivityListEl';
import '../style/backoffice.css';

function BackofficeAllActivities() {

    const [activities, setActivities] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/activities/`, { 'credentials': 'include' });
            const json = await res.json();
            setActivities(json.activities);
        }

        fetchData();
    }, [setActivities]);

    if (!activities) {
        return (
            <>
                <Navbar />
                <main className="container" id="backofficecontainer">
                    <BackofficeMenu />
                    <p>Aan het laden...</p>
                </main>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div class="interface">
                    <h2>Alle activiteiten</h2>
                    <div class="info">
                        {activities.map(activity => (
                            <ActivityListEl activity={activity} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default BackofficeAllActivities
