import React from 'react';
import '../style/footer.css';
import facebooklogo from '../images/weblinks/facebooklogo.png';
import instagamlogo from '../images/weblinks/instagramlogo.png';
import twitterlogo from '../images/weblinks/twitterlogo.png';
import weblink from '../images/weblinks/weblinklogo.png';

const Footer = () => {
    return (
        <footer>
            <h5 class="copyright">copyright - KSA Rooyghem Webteam<br></br>2020</h5>
            <div class="weblinks-onder">
                <ul>
                    <li><a href="https://www.facebook.com/ksarooyghem/"><img src={facebooklogo} alt="" /></a></li>
                    <li><a href="https://www.instagram.com/ksarooyghem/"><img src={instagamlogo} alt="" /></a></li>
                    <li><a href="https://twitter.com/ksarooyghem"><img src={twitterlogo} alt="" /></a></li>
                    <li><a href="#"><img src={weblink} alt="" /></a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;