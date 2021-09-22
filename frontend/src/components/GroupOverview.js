import React from 'react';

const GroupOverview = (props) => {
    
    return(
        <div id="groupinfo">
           <img src={props.logo}/>
           <h3>Adres</h3>
           <p>
               {props.location_name} <br/>
                {props.location_adress}
           </p>
           <h3>Contact</h3>
           <p>{props.contact}</p>
        </div>
    );
}

export default GroupOverview;