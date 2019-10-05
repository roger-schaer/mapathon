import React from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "./Map.css";

export default class Map extends React.Component {
    componentDidMount() {
        // create map
        this.map = L.map('map', {
            center: [46.5161, 6.4996],
            zoom: 10,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ]
        });
    }

    render() {
        return <div id="map"></div>
    }
}
