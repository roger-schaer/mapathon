import React, {useState} from "react";
import "./Home.css";
import logo from '../assets/mapTest.PNG';
import ReactMap from "./Map";
import POIList from "./POIList";
import request from "../utils/request";
import endpoints from "../endpoints";
import {useAuth0} from "../react-auth0-spa";

export default function HomePage(props){

    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let [pois, setPois] = useState([]);

    let handlePOIsClick = async e => {
        e.preventDefault();
        let poiList = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (poiList && poiList.length > 0) {
            console.log(poiList);
            setPois(poiList);
        }
    };

    return(
        <div className="home-div">
            <div className="map-div">
                <ReactMap pois={pois}></ReactMap>
            </div>
            <div className="poi-list-div">
                <h2>Points of interests</h2>

                <POIList pois={pois} poisClick={handlePOIsClick}/>
                {/*<ul className="poi-list">
                    <li><a href="/">first point</a></li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>
                    <li>first point</li>
                    <li>second point</li>
                    <li>and all the others</li>

                </ul>*/}
            </div>
        </div>
    );

}