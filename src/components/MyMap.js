import React, { createRef, Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

type State = {
  hasLocation: boolean,
  latlng: {
    lat: number,
    lng: number
  }
};

export default class MyMap extends Component<{}, State> {
  state = {
    hasLocation: false,
    latlng: this.props.latlng || {
      lat: 46.282807,
      lng: 7.538748
    },
    marker: (
      //create a marker(pin) with a default value if none is set
      <Marker
        position={
          this.props.latlng || {
            lat: 46.282807,
            lng: 7.538748
          }
        }
      >
        <Popup>{this.props.textPopUp || "Default is on Techno-pôle"}</Popup>
      </Marker>
    )
  };

  mapRef = createRef<Map>();

  //on click on the map , require one autorisation to have my location
  handleClick = () => {
    const map = this.mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  };

  //the app found You ;)
  handleLocationFound = (e: Object) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };

  render() {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null;

    return (
      <Map
        center={this.state.latlng}
        length={4}
        onClick={this.handleClick}
        onLocationfound={this.handleLocationFound}
        ref={this.mapRef}
        zoom={16}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.marker}
        {marker}
      </Map>
    );
  }
}
