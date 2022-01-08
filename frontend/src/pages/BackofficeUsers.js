import React, { useState, useEffect } from 'react'
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';
import UserListEl from '../components/UserListEl';
import '../style/backoffice.css';

const BackofficeUsersPage = () => {
    const [users, setUsers] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/users/`, { 'credentials': 'include' });
            const json = await res.json();

            if (res.error) {
                setMessage("Er was een fout: " + json.error);
            } else {
                setUsers(json.users);
            }
        };

        fetchData();
    }, [setUsers, setMessage]);

    if (!users) {
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

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div class="interface">
                    <h2>Gebruikers</h2>
                    <div class="info">
                        {users.map(user => (
                            <UserListEl user={user} />
                        ))}
                    </div>
                    <a href="/backoffice/users/create" class="addLink">Nieuwe gebruiker</a>
                </div>
            </main>
        </>
    )
}

export default BackofficeUsersPage;