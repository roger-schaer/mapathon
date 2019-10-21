import React from "react";
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
                            key={poi.id}
                            lastPoiId={props.lastPoi} poi={poi}></MyMarker>
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
                <Popup><h3>{this.props.poi.name}</h3></Popup>
            </Marker>
        </>

    )
}
};