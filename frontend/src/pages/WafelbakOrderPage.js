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
                        Onze jaarlijkse wafelbak draait weer op volle toeren. Bestel snel je pakketjes heerlijke luikse wafels. Een pakket van 4 wafels kost €5.
                        De pakketten kunnen worden opgehaald op donderdag 28 oktober vanaf 19u, vrijdag 29 oktober vanaf 16u en zaterdag 30 oktober van 9u tot 12u.
                        Deadline om wafels te bestellen online is woensdag 27 oktober.
                    </p>
                    <WafelbakForm />
                </div>
                <div id="wafelbakphoto">
                    <img src="http://localhost:2000/public/images/wafelbak.jpg" alt="Wafelbak" />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default WafelbakOrderPage;