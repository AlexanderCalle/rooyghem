import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/index.css";
import "../style/style.css";
import Newsfeed from "../components/Newsfeed";

const HomePage = () => {
  const [newsfeeds, setNewsFeeds] = useState([]);
  console.log("Homepage");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_HOST}/newsfeeds`)
      .then((res) => res.json())
      .then((result) => {
        setNewsFeeds(result.newsfeeds);
      });
  }, []);

  return (
    <div class="full_page">
      <Navbar />
      <main class="container" id="index-container">
        <h2>Niet te missen!</h2>
        <section class="news">
          {newsfeeds.map((feed) => (
            <Newsfeed feed={feed} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
