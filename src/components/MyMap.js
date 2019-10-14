import React, { Component, createRef, Fragment } from "react";
import MENU_MODES from "../MenuModes";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Button } from "react-bootstrap";
import MenuSlide from "./MenuSlide";
import Control from "@skyeer/react-leaflet-custom-control";
import { IoMdLocate } from "react-icons/io";
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
    currentLocation: null,
    currentPointer: null,
    center: null
  };

  mapRef = createRef();
  handleMenuChange = isOpen => {
    this.props.handleMenuChange(isOpen);
  };
  handleClick = e => {
    if (this.props.isAuthenticated) {
      this.setState(prevState => ({
        currentPointer: e.latlng
      }));
    }
  };
  handleSelfLocate = () => {
    const map = this.mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  };

  handleLocationFound = (e: Object) => {
    this.setState({
      hasLocation: true,
      currentLocation: e.latlng,
      center: e.latlng
    });
  };
  handleForm = newPOI => {
    this.props.handleForm(newPOI);
  };
  // recenter = () => {
  //   if (this.state.hasLocation) {
  //     this.setState(prevState => ({
  //       hasLocation: false,
  //       center: null
  //     }));
  //   }
  // };

  render() {
    let currentLocationMarker = this.state.currentLocation ? (
      <Marker position={this.state.currentLocation}>
        <Popup>{this.props.meText || "You are here"}</Popup>
      </Marker>
    ) : null;
    let currentPointerMarker =
      this.state.currentPointer != null ? (
        <Marker
          position={this.state.currentPointer}
          draggable={true}
          autoPan={true}
        >
          <Popup>
            <Button variant="primary" onClick={this.props.handleMenu}>
              Add location
            </Button>
          </Popup>
        </Marker>
      ) : null;

    return (
      <div>
        <MenuSlide
          isOpen={this.props.menuState}
          menuMode={
            this.state.currentPointer ? MENU_MODES.ADD_POI : MENU_MODES.DEFAULT
          }
          handleMenuChange={this.handleMenuChange}
          currentPointer={this.state.currentPointer}
          handleForm={this.handleForm}
        />
        <Map
          center={
            // this.props.markers && this.props.markers[0]
            //   ? this.props.markers[0].position
            //   : [46.310473, 7.6397229] //leuk
            this.state.center
              ? [this.state.center.lat, this.state.center.lng]
              : [46.310473, 7.6397229]
          }
          onLocationfound={this.handleLocationFound}
          zoom={13}
          ref={this.mapRef}
          onClick={this.handleClick}
          doubleClickZoom={false}
          // onMouseUp={this.recenter}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Control position="topleft">
            <Button variant="danger" onClick={this.handleSelfLocate}>
              <div style={{ color: "white" }}>
                <IoMdLocate size={24} />
              </div>
            </Button>
          </Control>
          {currentLocationMarker}
          {currentPointerMarker}
          <MyMarkersList markers={this.props.markers} />
        </Map>
      </div>
    );
  }
}
