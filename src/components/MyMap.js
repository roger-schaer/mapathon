import React, { Component, createRef, Fragment } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

type Position = [number, number];
type Props = {|
  content: string,
  position: Position
|};

type MarkerData = {| ...Props, key: string |};

//what we must have to have a marker
const MyPopupMarker = ({ content, position }: Props) => (
  <Marker position={position}>
    <Popup>
      {content.title} <br />
      <small>{content.description}</small>
    </Popup>
  </Marker>
);
//all the pin of the bdd (make a loop).
const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers
    ? markers.map(({ key, ...props }) => <MyPopupMarker key={key} {...props} />)
    : null;
  return <Fragment>{items}</Fragment>;
};

type State = {
  markers: Array<MarkerData>
};

export default class MyMap extends Component<{}, State> {
  state = {
    hasLocation: false,
    latlng: {
      lat: 51.505,
      lng: -0.09
    }
  };

  mapRef = createRef();

  handleClick = () => {
    const map = this.mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  };

  handleLocationFound = (e: Object) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };

  render() {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>{this.props.meText || "You are here"}</Popup>
      </Marker>
    ) : null;
    return (
      <Map
        center={
          this.props.markers && this.props.markers[0]
            ? this.props.markers[0].position
            : [46.310473, 7.6397229] //leukkkk
        }
        onLocationfound={this.handleLocationFound}
        zoom={13}
        ref={this.mapRef}
        onClick={this.handleClick}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker}
        <MyMarkersList markers={this.props.markers} />
      </Map>
    );
  }
}
