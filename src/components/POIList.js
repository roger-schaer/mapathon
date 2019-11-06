import React, {useState, useEffect} from "react";
import "./Home.css";
import {useAuth0} from "../react-auth0-spa";
import POI from "./POI";


export default function POIList(props){
    let usr = useAuth0();

    //handles the click on one poi by the user
    let singlePoiClick = (id) => {
        props.singlePoiClick(id);
    }

    //We run the fetch to the server (called poisClick) only one time
    useEffect(() => {
        props.poisClick();
    }, []);
    // Check if the user is authenticated
    if(!usr.isAuthenticated){
        return <a href="#" onClick={usr.loginWithRedirect}>You need to login to see the points of interests</a>
    };

    //returns the list of all POIs
    return (
        <header className="poi-list">
            {props.pois.length == 0 && (
                <p>Sorry, no POI's available</p>
            )}
             {props.pois && props.pois.length > 0 && (
                <ul className="POI-List">
                    {props.pois.map(poi => (
                        <li key={poi.id}>
                            {poi.name.length > 0 &&(
                            <POI {...poi} singlePoiClick={singlePoiClick} />)}
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}