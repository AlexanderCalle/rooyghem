import React from 'react';
import '../style/backoffice.css';

const ActivityListEl = (props) => {
    const dateFormatOptions = {
        month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: '2-digit'
    }

    const startTime = new Intl.DateTimeFormat('default', dateFormatOptions).format(Date.parse(props.activity.start_date));
    const endTime = new Intl.DateTimeFormat('default', dateFormatOptions).format(Date.parse(props.activity.end_date));
    const updateLink = "/backoffice/activities/update/" + props.activity.activity_id;
    const deleteLink = "/backoffice/activities/delete/" + props.activity.activity_id;

    return (
        <div class="interfaceinfo">
            <p>
                {props.activity.title}: {startTime} - {endTime}
            </p>
            <div class="buttons">
                <a href={updateLink}>Bewerk</a>
                <a href={deleteLink}>Verwijder</a>
            </div>
        </div>
    );
}

export default ActivityListEl;