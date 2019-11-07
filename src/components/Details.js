import React, {useState, useEffect, Dialog} from "react";
import POIForm from "./POIForm";
import BoxCategories from "./BoxCategories";
import BoxTags from "./BoxTags";
import {Button} from 'reactstrap';
import {useAuth0} from "../react-auth0-spa";
import request from "../utils/request";
import endpoints from "../endpoints";
import requestDelete from "../utils/requestDelete";
import DeleteModal from "./DeleteModal";
import {Link, useHistory} from "react-router-dom";
import PreviewMap from "./PreviewMap";
import "./Details.css";
import LikesBox from "./LikesBox";

export default function Details(props){

    let url = window.location.href;
    let positionLastSlash = url.lastIndexOf('/');
    let param = url.substring(positionLastSlash+1);
    let history = useHistory();
    let [poi, setPoi] = useState(0)
    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let [isLoaded, setIsLoaded] = useState(false);
    let currentUser = useAuth0().user;
    let poiCreator = poi.Creator;
    let [isEdit, setIsEdit] = useState(false);
    let [valueButtonEdit, setValueButtonEdit] = useState("Edit");
    let [newPOI, setNewPOI] = useState(null);
    let [isNew, setIsNew] = useState(true);
    let currentId = url.substring(url.lastIndexOf("/")+1);
    let [isClicked, setIsClicked] = useState(false);
    let [categories, setCategories] = useState([]);
    let [tags, setTags] = useState([]);
    let [isPopupOpen, setIsPopupOpen] = useState(false);
    let [isChangeCategoriesTags, setIsChangeCategoriesTags] = useState(false);
    let [isChangeLike, setIsChangeLike] = useState(false)
    let [isLiked, setIsLiked] = useState(false);

    //Status
    let [status, setStatus] = useState([]);
    let [test, setTest] = useState(1);

    useEffect(() => {
        let myPoi = request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${'/'+param}`,
            getTokenSilently,
            loginWithRedirect,
            setIsLoaded(true)
        ).then(token => {setPoi(token)} );
        setIsChangeCategoriesTags(false);
        setIsChangeLike(false);
    }, [isChangeCategoriesTags, isChangeLike]);

    useEffect( () => {

        if(props.posClicked != null && !isNaN(currentId)){
            setIsClicked(true);
            defaultPOI.lat = props.posClicked.lat;
            defaultPOI.lng = props.posClicked.lng;
        }else{
            setIsClicked(false);
        }

        if(props.isEditMarker === true){
            setValueButtonEdit("Close edit mode")
        }

        console.log(currentId);
        if(currentId === ""){
            //No id means new Poi
            console.log("New POI");
            setIsNew(true);
            setNewPOI(defaultPOI);
        }else if(isNaN(currentId)){
            //if not a number, it means new poi
            console.log("NaN is returned");
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
        if(isEdit || props.isEditMarker){
            setIsEdit(false);
            props.setIsEditMarker(false);
            setValueButtonEdit("Edit")
        }else{
            setIsEdit(true);
            setValueButtonEdit("Close edit mode")
        }
    };

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
    };

    useEffect(() => {
        fetchCategoriesAndTags();
    }, []);

    let onChangeCategoriesTag = (value) => setIsChangeCategoriesTags(value);
    let onChangeLike = (value) => setIsChangeLike(value);

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

        let responseStat = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.status}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (responseStat && responseStat.length > 0) {
            setStatus(responseStat);
        }

        return;
    };

        return(
            <div>

                <LikesBox thisPoi={poi} onChangeLike={onChangeLike}/>

                {(poiCreator && currentUser.sub === poiCreator.id) &&
                <div className='div-button'>
                    <Link to='/' className='back-button' style={{verticalAlign: 'bottom'}}>Back</Link><span> </span>
                    <Button onClick={onClickEditButton} style={{marginTop: '10px'}}>{valueButtonEdit}</Button>
                    <span> </span>
                    {!isNew && poi.Creator &&
                    (currentUser.sub === poi.Creator.id) &&
                    <DeleteModal
                        buttonLabel={"POI"}
                        currentName={poi.name}
                        className='delete-modal'
                        deleteClicked={deletePoi}/>
                    }
                </div>}

                <div>
                    {test}
                    {status && (
                        <span className="status">
                            <small>{status.name}</small>
                        </span>
                    )}
                </div>

                <POIForm thisPoi={poi} isEdit={isEdit} setIsEdit={setIsEdit} newPoi={newPOI} currentId={currentId} isNew={isNew} isClicked={isClicked}
                         setValueButtonEdit={setValueButtonEdit} isEditMarker={props.isEditMarker} setIsEditMarker={props.setIsEditMarker}/>

                {!isEdit && !isNew &&
                <div className="div-box-and-map">
                    <div style={{textAlign: 'left'}}>
                        <Link to='/' className='back-button' style={{verticalAlign: 'bottom', paddingLeft: '20px'}}>Back</Link>
                    </div>
                    <div className="div-box">
                        <BoxCategories thisPoi={poi} currentId={currentId} currentUser={currentUser} allCategories={categories} onChangeC={onChangeCategoriesTag}/>
                        <BoxTags thisPoi={poi} currentUser={currentUser} currentUser={currentUser} allTags={tags} onChangeT={onChangeCategoriesTag}/>
                    </div>
                    {/*Preview map*/}
                    {poi.lat && poi.lng &&
                    <div className="div-preview-map">
                        <PreviewMap lat={poi.lat} lng={poi.lng}/>
                    </div>

                    }

                </div>}

            </div>
        );

}