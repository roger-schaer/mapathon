import React, {useState} from "react";
import "./Home.css";
import ReactMap from "./Map";
import POIList from "./POIList";
import Footer from "./Footer";
import request from "../utils/request";
import endpoints from "../endpoints";
import {useAuth0} from "../react-auth0-spa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Switch from "react-switch";
import {Link, useHistory} from "react-router-dom";

export default function HomePage(props){
    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let [pois, setPois] = useState([]); //Only one POI list (for the state)
    let [lastPoiId, setLastPoi] = useState(0);
    let mapRef = React.createRef();
    let [latToPass, lngToPass] = useState(0);
    let usr = useAuth0();
    let history = useHistory();

    let [filtergroupe, setFilterGroupe] = useState(false);
    let [filterusr, setFilterUsr] = useState(false);
    let [groupnr, setGroupnr] = useState(3);

    //to save the filtered list of poi's
    let poisnew = pois;

    let handleFilterGroupe = e => {
        setFilterGroupe(!filtergroupe);
    };

    let handleFilterUser = e => {
        setFilterUsr(!filterusr);
    };

    //Customizing the list of POIs
    if (filtergroupe) {
        poisnew = pois.filter(poi => poi.group == [groupnr]);
    }

    if (filterusr) {
        poisnew = pois.filter(poi => poi.Creator.name == [usr.user.name]);
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
        history.push("/details/");
    }

    let getEditMarkerState = (editMarkerState) => {
        sendEditMarkerState(editMarkerState)
    }

    let sendEditMarkerState = (editMarkerState) => {
        props.callBackEditMarkerState(editMarkerState);
    }

    //Send data to App Jonas
    let sendDataLatLng = (lat, lng) => {
        props.callbackHandleNewPoiClicking(lat, lng);
    }

    //Handles clicks on a poi from the list
    //updates the view of the map accordingly
    let singlePoiClick = (id) =>{
        let poi = getPoiById(id);

        let newPosition = {
            lat: poi.lat,
            lng: poi.lng,
        };
        //use the map ref to recenter the map
        mapRef.current.recenterMap(newPosition);
        setLastPoi(id);
    }

    //gets the poi from the specified id
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
    const addNewPoiClicking = () => {
        mapRef.current.toggleAdding();
        setModal(!modal);
    }

    //End new modal

    // Returns the main div of the application containing the map and the poi list
    return(
        <div className="home-div">
            <div className="map-div">
                <ReactMap pois={poisnew} lastPoi={lastPoiId} ref={mapRef} callbackHandleNewPoiClicking={handleNewPoiClicking} callBackEditMarkerState={getEditMarkerState} usr={usr}></ReactMap>
            </div>
            <div className="poi-list-div">
                <h2>Points of interests</h2>
                <div className="add-div">
                    <Button onClick={toggle} className="Button-addPoi">{buttonLabel}</Button>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Add POI</ModalHeader>
                        <ModalBody>Add a new POI manually (enter longitude and latitude) or add it by clicking on the map</ModalBody>
                        <ModalFooter>
                            <Link to='/details'>
                                <Button className="Button-manually">Manually</Button>
                            </Link>

                            <Button className="Button-clicking" onClick={addNewPoiClicking}>Clicking</Button>
                            <Button className="Button-cancel" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className="filter-div">
                    <label htmlFor="normal-switch">
                        POI's of the group ({groupnr}): &ensp;
                        <Switch
                            onChange={handleFilterGroupe}
                            checked={filtergroupe}
                            id="normal-switch"
                        />
                    </label>
                    <br/>
                    <label htmlFor="normal-switch">
                        POI's of the user: &ensp;
                        <Switch
                            onChange={handleFilterUser}
                            checked={filterusr}
                            id="normal-switch"
                        />
                    </label>
                </div>
                {/*Give the POI list*/}
                <POIList pois={poisnew} poisClick={handlePOIsClick} singlePoiClick={singlePoiClick}/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );

}