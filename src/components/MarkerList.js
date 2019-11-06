import React, {useState} from "react";
import {Marker, Popup} from "react-leaflet";
import Button from "reactstrap/es/Button";
import './Popup.css';
import {Link, useHistory} from "react-router-dom";
import L from "leaflet";

export default function MarkerList(props){

    let pois = props.pois;
    //returns the list of all markers

    let getEditMarkerState = (editMarkerState) => {
        sendEditMarkerState(editMarkerState)
    }

    let sendEditMarkerState = (editMarkerState) => {
        props.callBackEditMarkerState(editMarkerState);
    }


    return(
        <>
            {/*for each POI we create a marker*/}
            {pois && pois.length > 0 && (
                <>
                    {pois.map(poi => (
                        <MyMarker
                            usr={props.user}
                            key={poi.id}
                            lastPoiId={props.lastPoi} poi={poi}
                            callBackEditMarkerState={getEditMarkerState}/>
                    ))}
                </>
            )}
        </>
    );
}

//custom marker to implement OpenPopup method
class MyMarker extends React.Component{

    constructor(props){
        super(props);
        this.hRef = React.createRef(); //the reference of the marker
    }

    componentDidUpdate(): void {
        //if the marker id is the same as the last poi clicked,
        //We open the popup (when a user has clicked on one poi
        //on the poiList)
        if (this.props.poi.id === this.props.lastPoiId) {
            this.leafletPopup.leafletElement.openPopup();
        }
    }

    sendEditState = () => {
        let editMarkerState = true;
        this.props.callBackEditMarkerState(editMarkerState);
    }

    //Design the Popup, above the selected Marker
    render(){
        let isHisPoi = () => {
            if(this.props.usr.user.sub != null){
                if(this.props.usr.user.sub === this.props.poi.Creator.id){
                    return true
                }else{
                    return false
                }
            }
        }

        let groupnr1 = 1;
        let groupnr2 = 2;
        let groupnr3 = 3;
        let groupnr4 = 4;

        let gr1 = L.icon({
            iconUrl: require('../gr1.svg'),
            iconSize: [45,45],
            iconAnchor: [23, 45],
            popupAnchor:  [0,-40],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null});

        let gr2 = L.icon({
            iconUrl: require('../gr2.svg'),
            iconSize: [45,45],
            iconAnchor: [23, 45],
            popupAnchor:  [0,-40],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null});

        let gr3 = L.icon({
            iconUrl: require('../gr3.svg'),
            iconSize: [45,45],
            iconAnchor: [23, 45],
            popupAnchor:  [0,-40],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null});

        let gr4 = L.icon({
            iconUrl: require('../gr4.svg'),
            iconSize: [45,45],
            iconAnchor: [23, 45],
            popupAnchor:  [0,-40],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null});

        let icon;

        if(this.props.poi.group == [groupnr1]){
            icon = gr1;
        } else if(this.props.poi.group == [groupnr2]){
            icon = gr2;
        } else if(this.props.poi.group == [groupnr3]){
            icon = gr3;
        }
        else{
            icon = gr4
        };

        return (
        <>
            <Marker
                icon= {icon}
                ref={m => { this.leafletPopup = m; }}
                position={[this.props.poi.lat, this.props.poi.lng]}
            >
                <Popup className="popup">
                    <div className="informations-popup">
                        <h3>
                           {this.props.poi.name}
                        </h3>
                        {this.props.poi.description}
                    </div>
                    <div className='img-popup'>
                        <img style={{maxHeight: "100%", maxWidth: "100%"}} src={this.props.poi.image} alt="POI image"/><br/>
                    </div>
                    <Link className="link-popup" to={"details/"+this.props.poi.id}>
                        <Button className="button-popup" >
                            Details
                        </Button>

                    </Link>
                    {isHisPoi() &&
                    <Link className="link-popup" to={"details/"+this.props.poi.id}>
                        <Button className="button-popup" onClick={this.sendEditState}>Edit</Button>
                    </Link>
                    }

                </Popup>
            </Marker>
        </>
    )
}
};

class MyMarker2 extends React.Component{

    constructor(props){
        super(props);
        this.hRef = React.createRef(); //the reference of the marker
    }

    componentDidUpdate(): void {
        //if the marker id is the same as the last poi clicked,
        //We open the popup (when a user has clicked on one poi
        //on the poiList)
        if (this.props.poi.id === this.props.lastPoiId) {
            this.leafletPopup.leafletElement.openPopup();
        }
    }

    //Design the Popup, above the selected Marker
    render(){
        const myIcon = L.icon({
            iconUrl: require('../userMarker.svg'),
            iconSize: [58,58],
            iconAnchor: [58, 58],
            popupAnchor: null,
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null});


        let isHisPoi = () => {
            if(this.props.usr.user.sub === this.props.poi.Creator.id){
                return true
            }else{
                return false
            }
        }

        return (
            <>
                <Marker
                    icon={myIcon}
                    ref={m => { this.leafletPopup = m; }}
                    position={[this.props.poi.lat, this.props.poi.lng]}
                >
                    <Popup className="popup">
                        <div className="informations-popup">
                            <h3>
                                {this.props.poi.name}
                            </h3>
                            {this.props.poi.description}
                        </div>
                        <div className='img-popup'>
                            <img style={{maxHeight: "100%", maxWidth: "100%"}} src={this.props.poi.image} alt="POI image"/><br/>
                        </div>
                        <Link className="link-popup" to={"details/"+this.props.poi.id}>
                            <Button className="button-popup" >
                                Details
                            </Button>
                        </Link>
                        {isHisPoi() &&
                            <Link className="link-popup" to={"details/"+this.props.poi.id}>
                                <Button className="button-popup">Edit</Button>
                            </Link>
                        }

                    </Popup>
                </Marker>
            </>
        )
    }
};