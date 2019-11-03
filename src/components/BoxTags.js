import React from 'react';
import addLogo from "../assets/add-sign.png";
import Tag from "./Tag";
import ModalCategories from "./ModalCategories";

export default function BoxTags(props) {

    let poiTags = props.thisPoi.Tags;

    //returns a box With an add button and all tags
    return(
        <div className="categories-box">
            <div><h3 style={{display: "inline-block"}}>Tags</h3>
                <span> </span>
                { poiTags && props.thisPoi && (props.currentUser.sub === props.thisPoi.Creator.id) &&
                <button className="button-add-category"><img style={{maxWidth: '15px'}} src={addLogo}/> Add</button>
                }
            <span> </span>
            </div>

            {
                poiTags && poiTags.map(function(item, i){
                    console.log(item)
                    return <Tag
                        tagToDisplay = {item}
                        key={i}
                    />
                })
            }

        </div>
    );
}