import React, {useState} from "react";
import {Marker, Popup} from "react-leaflet";
import POIForm from "./POIForm";

export default function MarkerList(props){

    let pois = props.pois;

    return(
        <>
            {pois && pois.length > 0 && (
                <>
                    {pois.map(poi => (
                        <Marker position={[poi.lat, poi.lng]}>
                            <Popup><div><POIForm isDisplayOnly="true" poi={poi}/></div></Popup>
                        </Marker>
                            ))}
                </>

            )}
        </>

    );
}