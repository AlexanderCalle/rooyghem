import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar';
import CreateAspirantForm from '../components/CreateAspirantFrom';

const BackofficeAspirantDelete = () => {
    const params = useParams();
    const [aspiInfo, setAspiInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/aspiranten/single/${params.aspi_id}`, { credentials: 'include' });
            const json = await res.json();
            setAspiInfo(json.aspi);
        }
        if (!aspiInfo) {
            fetchData();
        }
    }, [setAspiInfo, aspiInfo]);

    if(!aspiInfo) {
        return(
        <>
            <p>Aan het laden...</p>
        </>
        );
    }

    const deleteAspi = async () => {
        const requestOptions = {
            method: "DELETE",
            credentials: "include"
        };
        
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/aspiranten/delete/single/${aspiInfo.aspi_id}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    window.location = "/backoffice/aspiranten";
                }
            });
    }

    return(
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <CreateAspirantForm aspirantInfo={aspiInfo} readOnly={true} />
                    <button onClick={deleteAspi}>Verwijder aspirant</button>
                </div>
            </main>
        </>
    );
}

export default BackofficeAspirantDelete;