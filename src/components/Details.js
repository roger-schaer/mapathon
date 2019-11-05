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
import {useHistory} from "react-router-dom";

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
    let [categories, setCategories] = useState([]);
    let [tags, setTags] = useState([]);
    let [isPopupOpen, setIsPopupOpen] = useState(false);
    let [isChangeCategoriesTags, setIsChangeCategoriesTags] = useState(false);

    console.log(props.posClicked);

    useEffect(() => {
        let myPoi = request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${'/'+param}`,
            getTokenSilently,
            loginWithRedirect,
            setIsLoaded(true)
        ).then(token => {setPoi(token)} )
        setIsChangeCategoriesTags(false);
    }, [isChangeCategoriesTags]);

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

    useEffect(() => {
        fetchCategoriesAndTags();
    }, []);

    let onChangeCategoriesTag = (value) => setIsChangeCategoriesTags(value);

    // get all the POI informations
    let fetchCategoriesAndTags = async () => {

        //category part
        let responseCat = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (responseCat && responseCat.length > 0) {
            setCategories(responseCat);
        }

        //tags part
        let responseTag = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.tags}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (responseTag && responseTag.length > 0) {
            setTags(responseTag);
        }
        return;
    };

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
                <POIForm thisPoi={poi} isEdit={isEdit} setIsEdit={setIsEdit} newPoi={newPOI} currentId={currentId} isNew={isNew} isClicked={isClicked}
                         setValueButtonEdit={setValueButtonEdit}/>
                <br/>
                {!isEdit && !isNew &&
                <div>
                    <BoxCategories thisPoi={poi} currentId={currentId} currentUser={currentUser} allCategories={categories} onChangeC={onChangeCategoriesTag}/>
                    <BoxTags thisPoi={poi} currentUser={currentUser} currentUser={currentUser} allTags={tags} onChangeT={onChangeCategoriesTag}/>
                </div>}

            </div>
        );

}