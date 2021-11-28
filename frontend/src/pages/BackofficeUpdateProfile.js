import React, { useState, useEffect} from 'react'
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';

function BackofficeUpdateProfile() {

    const {user_id} = JSON.parse(localStorage.getItem('tokens'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/profile/' + user_id, {'credentials': 'include'})
            const json = await res.json();

            if(json.statuscode === 200) {
                setUser(json.user);
            } else {
                console.log(json.error);
            }
        }

        fetchData();
        
    }, [user_id]);

    const update = (e) => {
        e.preventDefault();
        
        const data_body = {
            email: user.email,
            phone: user.phone
        }

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data_body)
        }

        fetch('http://localhost:2000/profile/update/' + user_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.statuscode === 200){ window.location = "/backoffice/profile"}
            })
    }
    
    if(!user) {
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
        <main className="container" id="backofficecontainer" >
            <BackofficeMenu />
            <div id="backofficecreation">
                <div id="creationform">
                    <h1>Maak gebruikers</h1>
                    <form onSubmit={update}>
                        <label for="email">Email </label>
                        <input id="email" type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} name="email" placeholder="Email..." />
                        <br />
                        <label for="phone">Telefoonnummer </label>
                        <input id="phone" type="text" name="phone" value={user.phone} onChange={e => setUser({...user, phone: e.target.value})} placeholder="Telefoonnummer..." />
                        <br />
                        <button type="submit">Update mijn profiel</button>
                    </form>
                </div>

            </div>
        </main>
        </>
    )

}

export default BackofficeUpdateProfile;
