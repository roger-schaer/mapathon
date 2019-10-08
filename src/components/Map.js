import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import "./Map.css";
import MarkerList from "./MarkerList";

type State = {
    lat: number,
    lng: number,
    zoom: number,
}

export default class ReactMap extends Component<{}, State> {
    state = {
        lat: 46.52594,
        lng: 6.49857,
        zoom: 12,
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
                <Map  style={{height: '100%'}} center={position} zoom={this.state.zoom} pois={this.props.pois}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} >
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <MarkerList pois={this.props.pois}/>
                </Map>

        )
    }
}