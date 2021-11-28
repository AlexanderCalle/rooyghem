import React from 'react';

const GroupOverview = (props) => {

    return (
        <div id="groupinfo">
            <img src={props.logo} />
            <div>
                <h3>Adres</h3>
                <p>
                    {props.location_name} <br />
                    {props.location_adress}
                </p>
            </div>
            <div>
                <h3>Contact</h3>
                <p>{props.contact}</p>
            </div>
        </div>
    );
}

export default GroupOverview;