import React from 'react';

const ActivityListEl = (props) => {
    const dateFormatOptions = {
        month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: '2-digit'
    }

    const startTime = new Intl.DateTimeFormat('default', dateFormatOptions).format(Date.parse(props.activity.start_date));
    const endTime = new Intl.DateTimeFormat('default', dateFormatOptions).format(Date.parse(props.activity.end_date));
    const updateLink = "/backoffice/activities/update/" + props.activity.activity_id;
    
    const deleteLink = async () => {
        const response = await fetch('http://localhost:2000/activities/delete' + props.activity.activity_id, {'credentials': 'include'});
        switch(response.statusCode) {
            case 200:
                window.location.reload();
                break;
            case 401:
                alert('Je hebt geen toegang om dit te doen!');
                break;
            case 400:
                alert('Er is een fout opgetreden probeer opnieuw');
                break;
            default:
                break;
        } 
    };

    return (
        <div class="interfaceinfo">
            <p>
                {props.activity.title}: {startTime} - {endTime}
            </p>
            <div class="buttons">
                <a href={updateLink}>Bewerk</a>
                <a href={deleteLink}>Verwijder</a>
            </div>
            <p></p>
        </div>
    );
}

export default ActivityListEl;