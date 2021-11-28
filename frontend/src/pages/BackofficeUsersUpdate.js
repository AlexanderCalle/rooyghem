import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackofficeMenu from '../components/BackofficeMenu';
import '../style/backoffice.css'
import CreateUsersForm from '../components/CreateUsersForm';

function BackofficeUsersUpdate() {
    const params = useParams();

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}/users/single/` + params.user_id, { 'credentials': 'include' });
            const json = await res.json();
            setUserInfo(json.user);
        }

        fetchData();
    }, [setUserInfo, params.user_id]);

    if (!userInfo) {
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
    console.log(userInfo);
    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <CreateUsersForm userInfo={userInfo} />
            </main>
        </>
    )
}

export default BackofficeUsersUpdate;
