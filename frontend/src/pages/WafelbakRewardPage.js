import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../style/wafelbak.css'
import { useParams } from 'react-router-dom';

const WafelbakOrderPage = () => {

    const { order_id } = useParams();
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [pickUpMoment, setPickUpMoment] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/wafelbak/${order_id}`).then((response) => response.json())
            .then(result => {
                console.log(result);
                setFirstname(result.firstname);
                setLastname(result.lastname);
                setPickUpMoment(result.pick_up_moment);
                setTotalAmount(result.total_amount);
            })
    }, [order_id])

    return (
        <>
            <Navbar />
            <main id="wafelbakcontent">
                <div id="wafelbakform">
                    <h2>Bestelling met succes geplaatst!</h2>
                    <p>
                        Beste {firstName} {lastName}<br />
                        Heel Ksa Rooyghem wil u bedanken voor uw bestelling!<br />
                        Uw bestelling van {totalAmount} pakketten is met succes geplaatst!<br />
                        U kunt deze afhalen op {pickUpMoment}<br />
                        Wij werken met een belonings systeem, in de onderstaande link zal je moeten invullen hoeveel pakketten u heeft besteld.<br /> <br />
                        <a href={"https://forms.gle/fpFLGTun3bQQnWiv5"} target={"_blank"}>Link naar form</a><br />
                        Vele Ksa Groeten
                    </p>
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
