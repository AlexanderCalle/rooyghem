import React, { useState, useEffect } from 'react'
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';
import '../style/backoffice.css';

function BackofficeProfile() {

    const { user_id } = JSON.parse(localStorage.getItem('tokens'));
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/profile/` + user_id, { 'credentials': 'include' })
            const json = await res.json();
            console.log(json.statuscode);
            if (json.statuscode === 200) {
                setUser(json.user);
            }
        }

        fetchData();
    }, [user_id, setUser]);

    if (!user) {
        return (
            <>
                <Navbar />
                <main className='container' id="backofficecontainer">
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
                <div id="backofficecreation">
                    <div>
                        <h1>Mijn Profiel</h1>
                        <br />
                        <h3>Email: </h3>
                        <p>{user.email}</p>
                        <h3>Telefoonnummer: </h3>
                        <p>{user.phone}</p>
                        <button onClick={() => window.location = "/backoffice/profile/update"}>Gegevens veranderen?</button> <br /> <br />
                        <a href="/forgot">Wachtwoord veranderen?</a>
                    </div>
                </div>
            </main>
        </>
    )

}

export default BackofficeProfile;
