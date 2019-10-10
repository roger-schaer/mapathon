import React, {useState} from "react";
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
                        <Marker position={[poi.lat, poi.lng]}>
                            {/*Popup for each marker with the POI datas*/}
                            <Popup><div><POIForm isDisplayOnly="true" poi={poi}/></div></Popup>
                        </Marker>
                            ))}
                </>

            )}
        </>

    );
}