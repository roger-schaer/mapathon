import React from "react";
import "./Home.css";
import logo from '../assets/mapTest.PNG';

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
                    <h2>Map</h2>
                    <img src={logo} className="map-image"/>
                </div>
                <div className="poi-list-div">
                    <h2>Points of interests</h2>
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
                </div>
            </div>
        );
    }
}