import React, {useState} from "react";
import POIForm from "./POIForm";
import BoxCategories from "./BoxCategories";
import BoxTags from "./BoxTags";
import {Argv as queryString} from "yargs";

export default function Details(props){

    /*let url = window.location.href;
    let param = url.substring(30)
    let [setPoiId, poiId] = useState(0);
    setPoiId(param);*/

    return(
        <div>
            <POIForm/>
            <br/>
            <BoxCategories/>
            <BoxTags/>
        </div>
    );
}