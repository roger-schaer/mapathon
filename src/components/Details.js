import React, {useState, useEffect} from "react";
import POIForm from "./POIForm";
import BoxCategories from "./BoxCategories";
import BoxTags from "./BoxTags";
import {Argv as queryString} from "yargs";
import {useAuth0} from "../react-auth0-spa";
import request from "../utils/request";
import endpoints from "../endpoints";

export default function Details(props){

    let url = window.location.href;
    let positionLastSlash = url.lastIndexOf('/');
    let param = url.substring(positionLastSlash+1);

    let [poi, setPoi] = useState(0)
    let { loginWithRedirect, getTokenSilently } = useAuth0();

    console.log(props.posClicked);

    useEffect(() => {
        let myPoi = request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${'/'+param}`,
            getTokenSilently,
            loginWithRedirect,
        ).then(token => {setPoi(token)} );
        console.log(poi);
    }, []);

        return(
            <div>
                <POIForm thisPoi={poi}/>
                <br/>
                <BoxCategories/>
                <BoxTags/>
            </div>
        );



}