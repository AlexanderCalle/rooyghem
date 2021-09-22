import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import GroupOverview from '../components/GroupOverview';
import LeaderOverview from '../components/Leader';
import '../style/group.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const GroupPage = () => {
    const params = useParams();
    const [groupInfo, setGroupInfo] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [leaderInfo, setLeaderInfo] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/groups/' + params.group_name + '/info');
            const json = await res.json();
            setGroupInfo(json.group);
            setLocationInfo(json.location);
            setLeaderInfo(json.leaders);
        }

        fetchData();
    }, [params.group_name, setGroupInfo, setLocationInfo, setLeaderInfo]);

    if (!groupInfo || !locationInfo || !leaderInfo) {
        return (<div>Aan het laden...</div>);
    }
    return (
        <>
            <Navbar />
            <main class="container" id="groupcontainer">
                <div class="info">
                    <GroupOverview logo={groupInfo.logo} location_name={locationInfo.name} location_adress={locationInfo.adress} contact={groupInfo.contact}/>
                    <div id="groupstory">
                        <h3>Verhalend Kader</h3>
                        <div id="vkDiv">
                            {groupInfo.story}
                        </div>
                    </div>
                </div>
                <div class="groupleaders">
                    <div id="groupleaders-title"> 
                        <h3>Leiders</h3>
                    </div>
                    <div id="groupleaders-content">
                        {leaderInfo.map(leader => (
                            <LeaderOverview picture={leader.picture} firstname={leader.firstname} lastname={leader.lastname} contact={leader.email} isBanleader={leader.is_banleader}/>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default GroupPage;