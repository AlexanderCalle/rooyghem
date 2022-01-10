import React from 'react';
import '../style/navbar.css';
import banner from '../images/66898832_503377667078169_9064108580730306560_n.jpg';
import facebooklogo from '../images/weblinks/facebooklogo.png';
import instagramlogo from '../images/weblinks/instagramlogo.png';
import twitterlogo from '../images/weblinks/twitterlogo.png';

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('tokens'));

    return (
        <header class="top-header">
            <div class="top-banner">
                <div id="logo"><a href="/"><img src={banner} alt="" /></a></div>
                <div class="weblinks-boven">
                    <a href="https://www.facebook.com/ksarooyghem/">
                        <img src={facebooklogo} alt="" /></a>
                    <a href="https://www.instagram.com/ksarooyghem/"><img src={instagramlogo} alt="" /></a>
                    <a href="https://twitter.com/ksarooyghem"><img src={twitterlogo} alt="" /></a>
                    <a href="#"><img src="/public/images/weblinks/weblinklogo.png" alt="" /></a>
                </div>
            </div>
            <nav class="nav-bar">
                <ul>
                    <li class="drpdwn"><a class="reference" href="#">Bannen</a>
                        <ul class="drpdwn-content">
                            <li><a class="firstItem" href="/groups">Overzicht</a></li>
                            <li><a href="/groups/kabouters/info">Kabouters</a></li>
                            <li><a href="/groups/pagadders/info">Pagadders</a></li>
                            <li><a href="/groups/jongknapen/info">Jongknapen</a></li>
                            <li><a href="/groups/knapen/info">Knapen</a></li>
                            <li><a href="/groups/jonghernieuwers/info">Jonghernieuwers</a></li>
                            <li><a href="/groups/aspiranten/info">Aspiranten</a></li>
                        </ul>
                    </li>
                    <li><a class="reference" href="/tokshop">Tokshop</a></li>
                    <li><a class="reference" href="/overons">Over ons</a></li>
                    {/* <li><a class="reference" href="/wafelbak">Wafelbak bestellen</a></li> */}
                    <li><a class="reference" href="/contact">Contact</a></li>
                    <li><a class="reference" href="/users/login">Login</a></li>
                </ul>

                {user && <p>{user.username}</p>}

            </nav>
        </header>
    )
}

export default Navbar;