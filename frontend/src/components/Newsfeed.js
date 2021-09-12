import React from "react";

const Newsfeed = (props) => {

    return (
        <div class="newsfeed">
            <h3 class="feedtitle">{props.feed.title}</h3>
            <img src={'http://localhost:2000/newsfeeds/' + props.feed.feed_id + '/picture'} alt="Picture for" class="feedimg" />
            <p class="feedp" dangerouslySetInnerHTML={{__html:props.feed.description}}></p>
        </div>
    )

}

export default Newsfeed;