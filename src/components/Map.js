import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import "./Map.css";
import MarkerList from "./MarkerList";

type State = {
    lat: number,
    lng: number,
    zoom: number,
}

export default class ReactMap extends Component<{}, State> {
    state = {
        zoom: 12,
        currentLatLng: {
            lat: 0,
            lng: 0
        }
    }

    recenterMap(newPosition){
        this.leafletMap.leafletElement.setView([newPosition.lat, newPosition.lng]);
    }

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
            console.log("Error")
        }
    }

    componentDidMount(): void {
        this.getGeoLocation();
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
          // here we create the map --> fix the height, define the center, the zoom, POIS
                <Map
                    ref={m => { this.leafletMap = m; }}
                    style={{height: '100%'}}
                    center={this.state.currentLatLng}
                    zoom={this.state.zoom}
                    pois={this.props.pois}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  {/*List of the markers defined by props*/}
                    <MarkerList lastPoi={this.props.lastPoi} pois={this.props.pois} />
                    <Marker position={this.state.currentLatLng}>
                        <Popup>You are here.</Popup>
                    </Marker>
                </Map>

        )
    }
}