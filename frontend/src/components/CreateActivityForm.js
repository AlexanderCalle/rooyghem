import React, {useState, useEffect} from 'react'

const CreateActivityForm = (props) => {

    const [groups, setGroups] = useState(null);

    const [title, setTitle] = useState(props.activity? props.activity.title : "");
    const [startTime, setStartTime] = useState(props.activity? props.activity.start_date.split('.')[0] : "");
    const [endTime, setEndTime] = useState(props.activity? props.activity.end_date.split('.')[0] : "");
    const [meetingpoint, setMeetingpoint] = useState(props.activity? props.activity.meetingpoint : "");
    const [description, setDescription] = useState(props.activity? props.activity.description : "");
    const [startPublication, setStartPublication] = useState(props.activity? props.activity.start_publication.split('T')[0] : "");
    const [endPublication, setEndPublication] = useState(props.activity? props.activity.end_publication.split('T')[0] : "");
    const [groupName, setGroupName] = useState("Kabouters");

    const formatDate = (dateString) => {
        let date = new Date(dateString);
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()+ "T" + date.getHours() + ":" + date.getMinutes();
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/groups/');
            const json = await res.json();
            setGroups(json.groups);
        }

        fetchData();
    }, [setGroups]);

    if(!groups) {
        return(
        <> 
            <p>Aan het laden...</p>
        </>
        );
    }

    const create = async e => {
        e.preventDefault();
        const data_act = {
            title,
            startTime,
            endTime,
            meetingpoint,
            description,
            startPublication,
            endPublication,
            groupName
        }

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data_act)
        }

        fetch('http://localhost:2000/activities/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.statusCode === 200) {
                    window.location = '/backoffice/activities';
                } else if(data.statusCode === 401) {
                    console.log(data.error);
                }
            })
    }

    const update = async e => {
        e.preventDefault();
        const data_act = {
            title,
            startTime,
            endTime,
            meetingpoint,
            description,
            startPublication,
            endPublication,
            groupName
        }

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data_act)
        }

        fetch('http://localhost:2000/activities/update/' + props.activity.activity_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.statusCode === 200) {
                    window.location = '/backoffice/activities';
                } else if(data.statusCode === 401) {
                    console.log(data.error);
                } else {
                    console.log(data.error);
                }
            })
    }

    return(
        <div id="creationform">
                    <h1>Activiteit maken</h1>

                    <form onSubmit={props.activity ? update : create}>
                        <label for="title">Titel </label> <br />
                        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Titel..." />
                        <br />
                        <label for="start_time">Start activiteit </label> <br />
                        <input id="start_time" value={startTime} onChange={(e) => setStartTime(e.target.value)} type="datetime-local" name="start_date" />
                        <br />
                        <label for="end_time">Einde activiteit </label><br/>
                        <input id="end_time" value={endTime} onChange={(e) => setEndTime(e.target.value)} type="datetime-local" name="end_date"/>
                        <br/>
                        <label for="meetingpoint">Plaats </label><br/>
                        <input id="meetingpoint" value={meetingpoint} onChange={(e) => setMeetingpoint(e.target.value)} type="text" name="meetingpoint" placeholder="Plaats..."/>
                        <br/>
                        <label for="description">Beschrijving </label><br/>
                        <input id="description" value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" placeholder="Beschrijving..."/>
                        <br/>
                        <label for="start_publication">Start publicatie </label><br/>
                        <input id="start_publication" value={startPublication} onChange={(e) => setStartPublication(e.target.value)} type="date" name="start_publication"/>
                        <br/>
                        <label for="end_publication">Einde publicatie </label><br/>
                        <input id="end_publication" value={endPublication} onChange={(e) => setEndPublication(e.target.value)} type="date" name="end_publication"/>
                        <br/>
                        <label for="bannen">Ban </label><br/>
                        <select id="bannen" onChange={(e) => setGroupName(e.target.value)} name="group_name">
                            {groups.map(function(group) {
                                return (<option> {group.name} </option>)
                            })}
                        </select>
                        <br/>
                        <button type="submit">{props.activity ? "Update activiteit" : "Maak activiteit"}</button>
                    </form>
                </div>
    );
}

export default CreateActivityForm;