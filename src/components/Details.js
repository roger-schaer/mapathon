import React, {useState, useEffect, Dialog} from "react";
import POIForm from "./POIForm";
import BoxCategories from "./BoxCategories";
import BoxTags from "./BoxTags";
import {Argv as queryString} from "yargs";
import {useAuth0} from "../react-auth0-spa";
import request from "../utils/request";
import endpoints from "../endpoints";
import requestDelete from "../utils/requestDelete";
import DeleteModal from "./DeleteModal";
import {Link, useHistory} from "react-router-dom";
import requestPatch from "../utils/requestPatch";

export default function Details(props){

    let url = window.location.href;
    let positionLastSlash = url.lastIndexOf('/');
    let param = url.substring(positionLastSlash+1);
    let history = useHistory();

    let [poi, setPoi] = useState(0)
    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let [isLoaded, setIsLoaded] = useState(false);

    let [isGoodUser, setIsGoodUser] = useState(false);

    let currentUser = useAuth0().user;
    let poiCreator = poi.Creator;
    let [isEdit, setIsEdit] = useState(false);
    let [valueButtonEdit, setValueButtonEdit] = useState("Edit")

    let [newPOI, setNewPOI] = useState(null);
    let [isNew, setIsNew] = useState(true);
    let currentId = url.substring(url.lastIndexOf("/")+1);
    let [isClicked, setIsClicked] = useState(false);

    let[isPopupOpen, setIsPopupOpen] = useState(false);

    console.log(props.posClicked);

    useEffect(() => {
        let myPoi = request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${'/'+param}`,
            getTokenSilently,
            loginWithRedirect,
            setIsLoaded(true)
        ).then(token => {setPoi(token)} );
    }, []);

    useEffect( () => {

        if(props.posClicked != null){
            setIsClicked(true);
            defaultPOI.lat = props.posClicked.lat;
            defaultPOI.lng = props.posClicked.lng;
        }else{
            setIsClicked(false);
        }

        console.log(currentId);
        if(currentId === ""){
            //No id means new Poi
            console.log("New POI");
            setIsNew(true);
            setNewPOI(defaultPOI);
        }else if(isNaN(currentId)){
            //if not a number, it means new poi
            console.log("NaN is returned")
            setIsNew(true);
            setNewPOI(defaultPOI);
        }else{
            //The poi should exist and will be fetched (if error, then we catch it below)
            setIsNew(false);
            setNewPOI(props.poi);
            if(poi.error){
                //The server responds with an error, thus set isNew and default poi
                setIsNew(true);
                setNewPOI(defaultPOI)
            }else{
                setNewPOI(poi);
            }
        }
    }, [currentId, poi]);

    //default values for new poi
    let defaultPOI = {
        name: '',
        description:'',
        lat:'',
        lng:'',
        image: '',
        url:'',
        group: 3,
        Creator: null
    }

    let onClickEditButton = () => {
        if(isEdit){
            setIsEdit(false);
            setValueButtonEdit("Edit")
        }else{
            setIsEdit(true);
            setValueButtonEdit("Close edit mode")
        }
    }

    //Delete the current poi (only avaliable if the user is the creator)
    let deletePoi = async () => {
        let response = await requestDelete(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${currentId}`,
            getTokenSilently,
            loginWithRedirect
        );
        console.log(response);
        currentId = 0;
        history.push("/home");
    }

        return(
            <div>
                {(poiCreator && currentUser.sub === poiCreator.id) &&
                <div>
                    <button onClick={onClickEditButton}>{valueButtonEdit}</button>
                    {!isNew && poi.Creator &&
                    (currentUser.sub === poi.Creator.id) &&
                    <DeleteModal
                        buttonLabel={"POI"}
                        currentName={poi.name}
                        className='delete-modal'
                        deleteClicked={deletePoi}/>
                    }
                </div>}
                <POIForm thisPoi={poi} isEdit={isEdit} newPoi={newPOI} currentId={currentId} isNew={isNew} isClicked={isClicked}/>
                <br/>
                {!isEdit && !isNew &&
                <div>
                    <BoxCategories thisPoi={poi} currentId={currentId} currentUser={currentUser}/>
                    <BoxTags thisPoi={poi} currentUser={currentUser}/>
                </div>}

            </div>
        );



}