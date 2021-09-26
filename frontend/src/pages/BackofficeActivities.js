import React, {useEffect, useState} from 'react';
import Auth from '../middleware/auth';
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';
import ActivityListEl from '../components/ActivityListEl';
import '../style/backoffice.css';
import Cookies from 'js-cookie';

const BackofficeActivitiesPage = () => {
    const user = JSON.parse(localStorage.getItem('tokens'));

    const [activities, setActivities] = useState(null);
    const [message, setMessage] = useState(null);

    Cookies.set('auth', (Cookies.get('auth')));
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/activities/me', {'credentials': 'include'});
            const json = await res.json();
            if(res.statusCode === 401) {
                setMessage("Authorazation mislukt probeer opnieuw in te loggen");
            }
            setActivities(json.activities);
        }

        fetchData();
    }, [setActivities]);

    if(!activities) {
        return(
        <> 
            <Navbar />
            <main class="container" id="backofficecontainer">
                <BackofficeMenu />
                {message ? <p>{message}</p> : <p>Aan het laden...</p>}
            </main>
        </>
        );
    }
    return(
        <>
            <Navbar/>
            <main class="container" id="backofficecontainer">
                <BackofficeMenu/>
                <div class="interface">
                    <h2>Activiteiten</h2>
                    <div class="info">
                        {activities.map(activity => (
                            <ActivityListEl activity={activity}/>
                        ))}
                    </div>
                    <a href="/backoffice/activities/create" class="addLink">Nieuwe activiteit</a>
                </div>
            </main>
        </>
    );
}

export default BackofficeActivitiesPage;