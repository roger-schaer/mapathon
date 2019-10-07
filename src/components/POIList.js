import React, {useState} from "react";
import "./Home.css";
import {useAuth0} from "../react-auth0-spa";
import request from "../utils/request";
import endpoints from "../endpoints";
import POI from "./POI";

export default function POIList(){
    let usr = useAuth0();
    let [pois, setPois] = useState([]);

    let handlePOIsClick = async e => {
        e.preventDefault();
        let pois = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`,
            usr.getTokenSilently,
            usr.loginWithRedirect
        );

        if (pois && pois.length > 0) {
            console.log(pois);
            setPois(pois);
        }
    };

    if(!usr.isAuthenticated){
        return <a href="#" onClick={usr.loginWithRedirect}>You need to login to see the points of interests</a>
    }
    return (
        <header className="poi-list">

            <a className="App-link" href="#" onClick={handlePOIsClick}>
                Get POIs
            </a>

            {pois && pois.length > 0 && (
                <ul className="POI-List">
                    {pois.map(poi => (
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