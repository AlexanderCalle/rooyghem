import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../style/message.css';

const UsersReset = () => {

    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [message, setMessage] = useState();

    function handleSubmit(e) {
        e.preventDefault();

        if (password && confirmPass && confirmPass === password) {

            axios.post(`${process.env.REACT_APP_BACKEND_HOST}/reset/${token}`, {
                password: password,
                confirm: confirmPass
            })
                .then(response => {
                    if (response.status === 200) {
                        window.location.href = '/users/login';
                    }

                    if (response.status === 404) {
                        setMessage({
                            type: "errorMessagge",
                            msg: "Geen geldige token"
                        });
                    }
                }).catch(err => {
                    setMessage({
                        type: "errorMessage",
                        msg: "Er is iets fout gelopen"
                    });
                })
        } else {
            setMessage({
                type: "errorMessage",
                msg: "Wachtoorden kloppen niet of niet ingevuld"
            })
        }

    }

    return (
        <>
            <Navbar />
            <main>
                <div class="login">
                    <h1>Reset wachtwoord</h1>
                    {message && (
                        <div className={message.type}>
                            {message.msg}
                        </div>
                    )}
                    <form class="login-form" onSubmit={e => handleSubmit(e)}>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Wachtwoord..." />
                        <input type="password" name="confirm" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Wachtwoord bevestigen..." />
                        <br />
                        <button type="submit">Reset Wachtwoord</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default UsersReset;
