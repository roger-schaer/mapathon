import React, { Component, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import "./Map.css";
import MarkerList from "./MarkerList";
import {Button} from 'reactstrap';

type State = {
    lat: number,
    lng: number,
    zoom: number,
}
//Dynamic map using leaflet
export default class ReactMap extends Component<{}, State> {

    state = {
        isAdding: false,
        zoom: 12,
        currentLatLng: {
            lat: 0,
            lng: 0
        }
    }

    //Recenter the position of the map
    recenterMap(newPosition){
        this.leafletMap.leafletElement.setView([newPosition.lat, newPosition.lng]);
    }

    //Gets the geolocation of the user
    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
        } else {
            console.log("Error");
        }
    };

    componentDidMount(): void {
        this.getGeoLocation();
    }

    //HandleClick on the map when adding a new POI jonas
    handleClick = (e) => {
        if(this.state.isAdding){
            const { lat, lng } = e.latlng;
            console.log(lat, lng);
            this.sendDataLatLng(lat, lng);

            this.setState(state => ({isAdding: !state.isAdding}));
        }
    }

    //Send data to home jonas
    sendDataLatLng = (lat, lng) => {
        this.props.callbackHandleNewPoiClicking(lat, lng);
    }

    //Toggle the add click jonas
    toggleAdding = () => {
        L.DomUtil.addClass(this.leafletMap.leafletElement._container,'crosshair-cursor-enabled');
        this.setState(state => ({isAdding: !state.isAdding}));
    }

    getEditMarkerState = (editMarkerState) => {
        this.sendEditMarkerState(editMarkerState)
    }

    addPoiOnUserPos = () => {
        this.sendDataLatLng(this.state.currentLatLng.lat, this.state.currentLatLng.lng);
    }

    sendEditMarkerState = (editMarkerState) => {
        this.props.callBackEditMarkerState(editMarkerState);
    }

    //returns a leaflet map with all markers
    render() {
        const position = [this.state.lat, this.state.lng];

        const myIcon = L.icon({
            iconUrl: require('../userMarker.svg'),
            iconSize: [58,58],
            iconAnchor: [29, 58],
            popupAnchor: [0, -58],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null});

        return (
          // here we create the map --> fix the height, define the center, the zoom, POIS
                <Map
                    ref={m => { this.leafletMap = m; }}
                    style={{height: '100%'}}
                    center={this.state.currentLatLng}
                    zoom={this.state.zoom}
                    maxZoom={15}
                    pois={this.props.pois}
                    isAdding={this.state.isAdding}
                    onClick={this.handleClick}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  {/*List of the markers defined by props*/}
                    <MarkerList lastPoi={this.props.lastPoi} pois={this.props.pois} user={this.props.usr} callBackEditMarkerState={this.getEditMarkerState} />
                    <Marker position={this.state.currentLatLng} icon={myIcon}>
                        <Popup>
                            <Button className='add-button-marker' onClick={this.addPoiOnUserPos}>Add POI here</Button>
                        </Popup>
                    </Marker>
                </Map>
        )
    }
}