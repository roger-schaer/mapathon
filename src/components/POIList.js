import React, {useState, useEffect} from "react";
import "./Home.css";
import {useAuth0} from "../react-auth0-spa";
import request from "../utils/request";
import endpoints from "../endpoints";
import POI from "./POI";

export default function POIList(props){
    let usr = useAuth0();
    let [filter, setFilter] = useState(false);
    let handleLikedOnlyClick = e => {
        setFilter(!filter);
    };

    let poisnew;
    if (filter) {
        poisnew = props.pois.filter(poi => poi.group == 0);
    } else {
        poisnew = props.pois;
    }

    let singlePoiClick = (id) => {
        props.singlePoiClick(id);
    }


    // Check if the user is authenticated
    if(!usr.isAuthenticated){
        return <a href="#" onClick={usr.loginWithRedirect}>You need to login to see the points of interests</a>
    }
    return (
        <header className="poi-list">

            <a className="App-link" href="#" onClick={props.poisClick}>
                Get POI's
            </a>

            <p>
            <input
                type="checkbox"
                checked={filter}
                id="liked-only"
                onChange={handleLikedOnlyClick}
            />
                Show only your POI's
            </p>


            {poisnew && poisnew.length > 0 && (
                <ul className="POI-List">
                    {poisnew.map(poi => (
                        <li key={poi.id}>
                            <POI {...poi} singlePoiClick={singlePoiClick} />
                        </li>
                    ))}
                </ul>
            )}
            <p></p>
        </header>
    );
}