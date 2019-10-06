import React from "react";
import "./Home.css";
import logo from '../assets/mapTest.PNG';
import Map from "./Map";
import POIList from "./POIList";

export default class HomePage extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render(){
        return(
            <div className="home-div">
                <div className="map-div">
                    <Map></Map>
                </div>
                <div className="poi-list-div">
                    <h2>Points of interests</h2>

                    <POIList/>
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
}