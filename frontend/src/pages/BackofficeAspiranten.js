import React, { useState, useEffect } from 'react'
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';
import UserListEl from '../components/UserListEl';

import '../style/backoffice.css';

const BackofficeAspirantenPage = () => {
    const [aspiranten, setAspiranten] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/aspiranten`, {'credentials': 'include'});
            const json = await res.json();

            if(res.error) {
                setMessage("Er was een fout: " + json.error);
            } else {
                setAspiranten(json.aspis);
            }
        };

        fetchData();
    }, [setAspiranten, setMessage]);

    if(!aspiranten) {
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

    return(
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div class="interface">
                    <h2>Aspiranten</h2>
                    <div class="info">
                        {aspiranten.map(aspi => (
                            <UserListEl user={aspi} isAspi={true} />
                        ))}
                    </div>
                    <a href="/backoffice/aspiranten/create" class="addLink">Nieuwe aspirant</a>
                </div>
            </main>
        </>
    );

}

export default BackofficeAspirantenPage;