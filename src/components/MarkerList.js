import React, {useEffect, useState} from "react";
import {Marker, Popup} from "react-leaflet";
import POIForm from "./POIForm";

export default function MarkerList(props){

    let pois = props.pois;

    return(
        <>
            {/*for each POI we create a marker*/}
            {pois && pois.length > 0 && (
                <>
                    {pois.map(poi => (
                        <MyMarker
                            lastPoiId={props.lastPoi} poi={poi}></MyMarker>
                        /*<Marker
                            lastPoiClicked={props.lastPoi}
                            position={[poi.lat, poi.lng]}>
                            {/!*Popup for each marker with the POI datas*!/}
                            <Popup><div><POIForm isDisplayOnly="true" poi={poi}/></div></Popup>
                        </Marker>*/
                            ))}
                </>

            )}
        </>

    );
}

class MyMarker extends React.Component{
    constructor(props){
        super(props);
        this.hRef = React.createRef();
    }
    componentDidUpdate(): void {
        if (this.props.poi.id === this.props.lastPoiId) {
            this.leafletPopup.leafletElement.openPopup();
        }
    }
    render(){
    return (
        <>
            <Marker ref={m => { this.leafletPopup = m; }} position={[this.props.poi.lat, this.props.poi.lng]}>
                <Popup><div><POIForm isDisplayOnly="true" poi={this.props.poi}/></div></Popup>
            </Marker>
        </>

    )
}


};