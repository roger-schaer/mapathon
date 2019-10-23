import React, {useState} from "react";
import POIForm from "./POIForm";
import BoxCategories from "./BoxCategories";
import BoxTags from "./BoxTags";
import {Argv as queryString} from "yargs";

export default function Details(props){

    let url = window.location.href;
    let positionLastSlash = url.lastIndexOf('/');
    let param = url.substring(positionLastSlash+1);

    return(
        <div>
            <POIForm idPoi={param}/>
            <br/>
            <BoxCategories/>
            <BoxTags/>
        </div>
    );
}