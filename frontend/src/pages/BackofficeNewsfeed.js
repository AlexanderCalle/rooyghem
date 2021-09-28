import React, {useState, useEffect} from 'react'
import '../style/backoffice.css'
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';

function BackofficeNewsfeed() {
    const [newsfeeds, setNewsFeeds] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/newsfeeds/backoffice', {'credentials': 'include'});
            const json = await res.json();

            if(json.statuscode === 200) {
                setNewsFeeds(json.newsfeeds);
            } else {
                console.log(json.error);
            }
        }

        fetchData();
    }, [setNewsFeeds]);

    const deleteNewsfeed = (feed_id) => {

        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
        }

        fetch("http://localhost:2000/newsfeeds/delete/" + feed_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.statuscode === 200) { 
                    window.location.reload();
                }
            })
    }

    if(!newsfeeds) {
        return (
            <>
            <Navbar />
            <main className='container' id="backofficecontainer">
                <BackofficeMenu />
                <p>Aan het laden...</p>
            </main>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <main className='container' id="backofficecontainer">
                <BackofficeMenu />
                <div class="interface">
                    <h2>Nieuwtjes</h2>
                    <div class="info">
                        {newsfeeds.map(newsfeed => (
                            <div class="interfaceinfo">
                                <p>{newsfeed.title}</p>
                                <div class="buttons">
                                    <a href={"/backoffice/newsfeed/update/" + newsfeed.feed_id}>bewerk</a>
                                    <a onClick={() => deleteNewsfeed(newsfeed.feed_id)}>delete</a>
                                </div>
                             
                            </div>
                        ))}
                    </div>
                    <a class="addLink" href="/backoffice/newsfeed/create">Nieuwe nieuwtje</a>
                </div>
            </main>
        </>
    )
}

export default BackofficeNewsfeed;
