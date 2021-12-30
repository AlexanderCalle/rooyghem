import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import CreateUsersForm from '../components/CreateUsersForm';

const BackofficeUsersDelete = () => {
    const params = useParams();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/users/single/` + params.user_id, { credentials: 'include' });
            const json = await res.json();
            setUserInfo(json.user);
        };

        fetchData();
    }, [setUserInfo, params.user_id])

    if (!userInfo) {
        return (
            <>
                <p>Aan het laden...</p>
            </>
        )
    }

    const deleteUser = async () => {
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        };

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/users/delete/single/` + userInfo.user_id, requestOptions)
            .then(response => {
                if (response.ok) {
                    window.location = "/backoffice/users";
                }
            });
    };

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <CreateUsersForm userInfo={userInfo} readOnly={true} />
                    <button onClick={deleteUser}>Verwijder gebruiker</button>
                </div>
            </main>
        </>
    );
}

export default BackofficeUsersDelete;