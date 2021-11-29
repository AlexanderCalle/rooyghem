import React from 'react';

const LeaderOverview = (props) => {
    let banleadertext = "";
    if (props.isBanleader) {
        banleadertext = "(Banleider)";
    }
    return (
        <div class="leader" style={{ margin: '10px' }}>
            <img src={`${process.env.REACT_APP_BACKEND_HOST}${props.picture}`} alt height="150px" />
            <p>
                {props.firstname} {props.lastname} <br />
                {props.contact} <br />
                {banleadertext}
            </p>
        </div>
    )
}

export default LeaderOverview;