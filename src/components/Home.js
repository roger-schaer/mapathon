import React, {useState} from "react";
import "./Home.css";
import ReactMap from "./Map";
import POIList from "./POIList";
import request from "../utils/request";
import endpoints from "../endpoints";
import {useAuth0} from "../react-auth0-spa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Switch from "react-switch";

export default function HomePage(props){


    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let [pois, setPois] = useState([]); //Only one POI list (for the state)
    let [lastPoiId, setLastPoi] = useState(0);
    let mapRef = React.createRef();
    let [latToPass, lngToPass] = useState(0);

    let [filter, setFilter] = useState(false);
    let [groupnr, setGroupnr] = useState(3);

    //to save the filtered list of poi's
    let poisnew;

    let handleLikedOnlyClick = e => {
        setFilter(!filter);
    };

    //Customizing the list of POIs
    if (filter) {
        poisnew = pois.filter(poi => poi.group == [groupnr]);
    } else {
        poisnew = pois;
    }

    // get all the POI informations
    let handlePOIsClick = async e => {

        let poiList = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (poiList && poiList.length > 0) {
            console.log(poiList);
            setPois(poiList);
        }
    }

    //Callback function to get lat and lng Jonas
    let handleNewPoiClicking = (lat, lng) => {
        latToPass = lat;
        lngToPass = lng;
        sendDataLatLng(latToPass, lngToPass);
    }

    //Send data to App Jonas
    let sendDataLatLng = (lat, lng) => {
        props.callbackHandleNewPoiClicking(lat, lng);
    }

    let singlePoiClick = (id) =>{
        let poi = getPoiById(id);

        let newPosition = {
            lat: poi.lat,
            lng: poi.lng,
        };
        mapRef.current.recenterMap(newPosition);
        setLastPoi(id);
    }

    let getPoiById = (id) =>{
        return pois.find(poi => poi.id === id);
    }

    //Create new Modal Jonas
    const {
        buttonLabel = "Add POI",
        className = "Modal-add"
    } = props;

    const [modal, setModal] = useState(false);

    //Modal button method
    const toggle = () => setModal(!modal);
    const addNewPoiManually = () => window.location = '/details';
    const addNewPoiClicking = () => {
        mapRef.current.toggleAdding();
        setModal(!modal);
    }

    //End new modal

    // main div
    return(
        <div className="home-div">
            <div className="filter-div">
                <label htmlFor="normal-switch">
                    <Switch
                        onChange={handleLikedOnlyClick}
                        checked={filter}
                        id="normal-switch"
                    />
                    <p>Show only the POI's of the group: {groupnr}</p>
                </label>
            </div>
            <div className="filter-div">
                <Button onClick={toggle} className="Button-addPoi">{buttonLabel}</Button>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Add POI</ModalHeader>
                    <ModalBody>Add a new POI manually (enter longitude and latitude) or add it by clicking on the map</ModalBody>
                    <ModalFooter>
                        <Button className="Button-manually" onClick={addNewPoiManually}>Manually</Button>
                        <Button className="Button-clicking" onClick={addNewPoiClicking}>Clicking</Button>
                        <Button className="Button-cancel" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div className="map-div">
                <ReactMap pois={poisnew} lastPoi={lastPoiId} ref={mapRef} callbackHandleNewPoiClicking={handleNewPoiClicking}></ReactMap>
            </div>
            <div className="poi-list-div">
                <h2>Points of interests</h2>
                {/*Give the POI list*/}
                <POIList pois={poisnew} poisClick={handlePOIsClick} singlePoiClick={singlePoiClick}/>

            </div>
        </div>
    );

}