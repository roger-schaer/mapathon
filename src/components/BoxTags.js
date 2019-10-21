import React from 'react';
import addLogo from "../assets/add-sign.png";
import Tag from "./Tag";

export default function BoxTags(props) {
    return(
        <div className="categories-box">
            <div><h3 style={{display: "inline-block"}}>Tags</h3>
                <span> </span><button className="button-add-category"><img style={{maxWidth: '15px'}} src={addLogo}/> Add</button></div>
            <Tag/><span> </span>
            <Tag/>
            <Tag/>
            <Tag/><Tag/><Tag/><Tag/><Tag/>
        </div>
    );
}