import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../style/index.css';
import '../style/style.css';
import newfeedTestimage from '../images/newsfeedpictures/1606637895806Nieuwesite66898832_503377667078169_9064108580730306560_n.jpg'

const HomePage = () => {

    return (
        <>
            <Navbar />
            <main class="container" id="index-container">
                <h2>Niet te missen!</h2>
                <section class="news">
                {/* <% newsfeeds.forEach(function(feed) { %>
                    
                <% }) %>     */}
                    <div class="newsfeed">
                        <h3 class="feedtitle">test</h3>
                        <img src={newfeedTestimage} alt="Picture for" class="feedimg" />
                        <p class="feedp">description</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default HomePage;