import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const Newsfeed = (props) => {

    return (
        <div class="newsfeed">
            <h3 class="feedtitle">{props.feed.title}</h3>
            <img src={`${process.env.REACT_APP_BACKEND_HOST}/newsfeeds/` + props.feed.feed_id + '/picture'} alt="Picture for" class="feedimg" />
            <ReactQuill class="feedp" theme="bubble" value={props.feed.description} readOnly={true} />
        </div>
    )

}

export default Newsfeed;