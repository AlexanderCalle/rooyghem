import React, { useState, useEffect, useCallback } from 'react';
import WafelbakForm from '../components/WafelbakForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../style/wafelbak.css'

const WafelbakOrderPage = () => {

    return (
        <>
            <Navbar />
            <main id="wafelbakcontent">
                <div id="wafelbakform">
                    <h2>Bestel hier onze heerlijke wafels!</h2>
                    <p>
                        Onze jaarlijkse wafelbak draait weer op volle toeren. Bestel snel je pakketjes heerlijke luikse wafels. Een pakket van 4 wafels kost <strong>€6</strong>. <br /> <br />
                        De wafels worden dit jaar verkocht ten voordele van de restoratie van ons lokaal in Male. <br /> <br />
                        De pakketten kunnen worden opgehaald op donderdag 27 oktober vanaf 19u, vrijdag 28 oktober vanaf 16u en zaterdag 29 oktober van 9u tot 12u.
                        Deadline om wafels te bestellen online is woensdag 26 oktober.
                    </p>
                    <WafelbakForm />
                </div>
                <div id="wafelbakphoto">
                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/public/images/wafelbak.jpg`} alt="Wafelbak" />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default WafelbakOrderPage;
