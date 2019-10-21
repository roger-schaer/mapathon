import React from "react";
import POIForm from "./POIForm";
import BoxCategories from "./BoxCategories";
import BoxTags from "./BoxTags";

export default function Details(props){



    return(
        <div>
            <POIForm/>
            <br/>
            <BoxCategories/>
            <BoxTags/>
        </div>
    );
}