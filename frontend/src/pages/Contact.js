import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../style/contact.css'

const Contact = () => {

    const [bondsleiders, setBondsleiders] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}/contact`);
            const json = await res.json();
            setBondsleiders(json.bondsleiders);
            console.log(json.bondsleiders);
            console.log("hrl");
        }

        fetchData();
    }, [])

    if (!bondsleiders) return (
        <>
            <Navbar />
            <main id="contactcontainer">Loading ...</main>
            <Footer />
        </>
    )

    return (
        <>
            <Navbar />
            <main id="contactcontainer">
                <div id="contactinfo">
                    <h2>KSA Rooyghem Sint-Kruis VZW</h2>
                    <h3>Adres Maatschappelijke zetel: </h3>

                    <p>Engelendalelaan 18 <br />
                        8310 St-Kruis <br />
                        <a href="/">www.ksarooyghem.be</a> <br />
                        <a href="mailto:info@ksarooyghem.be">info@ksarooyghem.be</a>
                    </p>

                    <h3>Contactgegevens Bondsleiding: </h3>

                    {bondsleiders.map(bondsleider => (
                        <>
                            <h4>{bondsleider.firstname + " " + bondsleider.lastname} </h4>
                            <p> {bondsleider.phone} </p>
                            <p> {bondsleider.email} </p>
                        </>
                    ))}

                    <h3>Bankgegevens KSA Rooyghem: </h3>
                    <p>IBAN: BE86 7380 3624 2050</p>
                    <p>BIC: KREDBEBB</p>
                    <p>BANK: KBC Bank</p>
                </div>
                {/* <div id="contactform">
                    <h3>Stuur ons een bericht</h3>
                    <%- include('./particals/messages.ejs') %>
                    <form action="/contact" method="POST">
                        <input name="naam" type="text" placeholder="Naam...">
                        <input name="email" type="email" placeholder="email...">
                        <input type="text" name="onderwerp" placeholder="Onderwerp...">
                        <textarea name="bericht" placeholder="Bericht..." cols="30" rows="10"></textarea>
                        <button type="submit" >Stuur bericht</button>
                    </form>
                </div> */}
            </main>
            <Footer />
        </>
    )

}

export default Contact;