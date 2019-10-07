import React, {useState} from "react";
import "./Home.css";
import {useAuth0} from "../react-auth0-spa";
import request from "../utils/request";
import endpoints from "../endpoints";
import POI from "./POI";

export default function POIList(props){
    let usr = useAuth0();


    if(!usr.isAuthenticated){
        return <a href="#" onClick={usr.loginWithRedirect}>You need to login to see the points of interests</a>
    }
    return (
        <header className="poi-list">

            <a className="App-link" href="#" onClick={props.poisClick}>
                Get POIs
            </a>

            {props.pois && props.pois.length > 0 && (
                <ul className="POI-List">
                    {props.pois.map(poi => (
                        <li key={poi.id}>
                            <POI {...poi} />
                        </li>
                    ))}
                </ul>
            )}
            <p></p>
        </header>
    );
}