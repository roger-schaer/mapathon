import React, { Component, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {Button} from 'reactstrap';
import L from "leaflet";


type State = {
    lat: number,
    lng: number,
    zoom: number,
}

export default class PreviewMap extends Component<{}, State> {

    state = {
        isChanging: false,
        lat: this.props.lat,
        lng: this.props.lng,
        zoom: 13,
    };

    componentDidUpdate() {
        if(this.props.lat !== this.state.lat || this.props.lng !== this.state.lng)
            this.setState({
                lat: this.props.lat,
                lng: this.props.lng
            })
    }

    handleClick = (e) => {
        if(this.state.isChanging){
            const { lat, lng } = e.latlng;
            var values = {
                lat: lat,
                lng: lng
            };
            this.props.editPoi(values);
            L.DomUtil.removeClass(this.leafletMap.leafletElement._container,'crosshair-cursor-enabled');
            this.setState(state => ({isChanging: !state.isChanging}));
            this.setState({lat: values.lat, lng: values.lng});
        }
    }

    changePosClick = () => {
        L.DomUtil.addClass(this.leafletMap.leafletElement._container,'crosshair-cursor-enabled');
        this.leafletMap.leafletElement.closePopup();
        this.setState(state => ({isChanging: !state.isChanging}))
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map
                center={position}
                zoom={this.state.zoom}
                style={{height: '100%'}}
                onClick={this.handleClick}
                ref={m => { this.leafletMap = m; }}
                maxZoom={15}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <Button onClick={this.changePosClick}>Change Position</Button>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}