import React, {useEffect, useState} from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../style/index.css';
import '../style/style.css';
import Newsfeed from '../components/Newsfeed';

const HomePage = () => {

    const [newsfeeds, setNewsFeeds] = useState([]);
    console.log("Homepage");
    useEffect(() => {
        fetch('http://localhost:2000/newsfeeds').then((res) => res.json())
            .then(result => {
                setNewsFeeds(result.newsfeeds);
            })
    }, [])

    return (
        <>
            <Navbar />
            <main class="container" id="index-container">
                <h2>Niet te missen!</h2>
                <section class="news">
                {newsfeeds.map(feed => (
                    <Newsfeed feed={feed} />
                ))}   
                </section>
            </main>
            <Footer />
        </>
    )
}

export default HomePage;