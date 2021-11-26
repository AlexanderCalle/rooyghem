import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GroupOverview from '../components/GroupOverview';
import LeaderOverview from '../components/Leader';
import '../style/group.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'

const GroupPage = () => {
    const params = useParams();
    const [groupInfo, setGroupInfo] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [leaderInfo, setLeaderInfo] = useState(null);
    const [albums, setAlbums] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/groups/' + params.group_name + '/info');
            const json = await res.json();
            setGroupInfo(json.group);
            setLocationInfo(json.location);
            setLeaderInfo(json.leaders);
        }
        const fetchDataAlbums = async () => {
            const res = await fetch('http://localhost:2000/albums/groups/' + params.group_name)
            const json = await res.json();
            setAlbums(json);
            console.log(json);
        }

        fetchData();
        fetchDataAlbums();
    }, [params.group_name, setGroupInfo, setLocationInfo, setLeaderInfo]);

    if (!groupInfo || !locationInfo || !leaderInfo) {
        return (<div>Aan het laden...</div>);
    }
    return (
        <>
            <Navbar />
            <main class="container" id="groupcontainer">
                <div class="info">
                    <GroupOverview logo={groupInfo.logo} location_name={locationInfo.name} location_adress={locationInfo.adress} contact={groupInfo.contact} />
                    <div id="groupstory">
                        <h3>Verhalend Kader</h3>
                        <div id="vkDiv">
                            <ReactQuill value={groupInfo.story} readOnly={true} theme="bubble" />
                        </div>
                    </div>
                </div>
                <div class="albums">
                    <h2>Albums</h2>
                    <div class="interface">
                        {
                            albums ? (
                                <>
                                    {albums.map(groupedAlbum => (
                                        <>
                                            <h3>{groupedAlbum.date}</h3>
                                            <div class="info">
                                                {groupedAlbum.albums.map(album => (
                                                    <a href={`/albums/groups/${params.group_name}/${album.album_id}`}>
                                                        <div class="interfaceinfo">
                                                            <div class="interfaceinfo-inner">
                                                                <img src="http://localhost:2000/public/images/album1.svg" width="50" height="auto" />
                                                                <p>{album.name}</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </>
                                    ))}
                                </>
                            ) : (
                                <p>Nog geen albums te zien!</p>
                            )
                        }
                    </div>
                </div>
                <div class="groupleaders">
                    <div id="groupleaders-title">
                        <h3>Leiders</h3>
                    </div>
                    <div id="groupleaders-content">
                        {leaderInfo.map(leader => (
                            <LeaderOverview picture={leader.picture} firstname={leader.firstname} lastname={leader.lastname} contact={leader.email} isBanleader={leader.is_banleader} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default GroupPage;