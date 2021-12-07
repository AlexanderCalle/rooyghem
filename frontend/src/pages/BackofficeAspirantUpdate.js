import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackofficeMenu from '../components/BackofficeMenu';
import '../style/backoffice.css';
import CreateAspirantForm from '../components/CreateAspirantFrom';

function BackofficeAspirantUpdate() {
    const params = useParams();

    const [aspiInfo, setAspiInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/aspiranten/single/${params.aspi_id}`, {'credentials': 'include'});
            const json = await res.json();
            setAspiInfo(json.aspi);
        }

        fetchData();
    }, [setAspiInfo]);

    if(!aspiInfo) {
        return (
            <>
                <Navbar />
                <main className="container" id="backofficecontainer">
                    <BackofficeMenu />
                    <p>Aan het laden...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                    <BackofficeMenu />
                    <CreateAspirantForm aspirantInfo={aspiInfo} />
            </main>
        </>
    );
}

export default BackofficeAspirantUpdate;