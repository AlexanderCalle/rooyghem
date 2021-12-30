import axios from 'axios';
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../style/message.css'

const UsersForgot = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState();

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_BACKEND_HOST}/forgot`, { email: email })
            .then(response => {
                if (response.status === 200) {
                    setMessage("Email met succes verzonden, bekijk je inbox!")
                }
            })

    }

    return (
        <>
            <Navbar />
            <main>
                <div class="login">
                    <h1>Wachtwoord veranderen</h1>
                    {message && (
                        <div class="succesMessage">
                            {message}
                        </div>
                    )}
                    <form class="login-form" onSubmit={(e) => handleSubmit(e)}>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email..." autofocus />
                        <br />
                        <button type="submit">Stuur mail</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default UsersForgot;
