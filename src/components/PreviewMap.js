import React, { Component, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {Button} from 'reactstrap';

type State = {
    lat: number,
    lng: number,
    zoom: number,
}

export default class PreviewMap extends Component<{}, State> {

    state = {
        lat: this.props.lat,
        lng: this.props.lng,
        zoom: 13,
    };

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom} style={{height: '100%'}}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <Button>Change Position</Button>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}