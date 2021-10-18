import React, {useState, useEffect} from 'react'
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';
import '../style/backoffice.css'

const BackofficeAllVk = () => {

    const [groups, setGroups] = useState(null);

    // fetch group data
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/groups/');
            const json = await res.json();
            setGroups(json.groups);
            console.log(json.groups);
        }

        fetchData();
    }, [setGroups]);

    if(!groups) {
        return (
            <>
            <Navbar />
            <main id="container" id="backofficecontainer">
                <BackofficeMenu />
                <p>Aan het laden...</p>
            </main>
        </>
        )
    }

    return (
        <>
            <Navbar />
            <main id="container" id="backofficecontainer">
                <BackofficeMenu />
                <div class="interface">
                    <h2>Alle verhalende kaders</h2>
                    <div class="info">
                        {groups.map(group => (
                            <div class="interfaceinfo">
                                <p>
                                    {group.name}
                                </p>
                                <div class="buttons">
                                    <a href={"/backoffice/vk/allvk/update/" + group.group_id}>Bewerk</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default BackofficeAllVk;
