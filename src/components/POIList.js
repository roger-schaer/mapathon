import React from "react";
import "./Home.css";
import {useAuth0} from "../react-auth0-spa";

export default function POIList(){
    let usr = useAuth0();
    if(!usr.isAuthenticated){
        return <a href="#" onClick={usr.loginWithRedirect}>You need to login to see the points of interests</a>
    }
    return (
        <ul className="poi-list">
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

        </ul>
    );
}