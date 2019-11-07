import React, {useState} from "react";
import endpoints from "../endpoints";
import requestPatch from "../utils/requestPatch";
import {useAuth0} from "../react-auth0-spa";

export default function LikesBox(props){

    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let poi = props.thisPoi;
    let [valueBtn, setValueBtn] = useState("Bug to correct");

    let initializeButton = () => {
        console.log("JE SUIS LA")
        console.log(poi.liked)
        if(poi.liked && poi != undefined){
            setValueBtn("Unlike : " + poi.liked)
        }else if(poi != undefined){
            setValueBtn("Like : " + poi.liked)
        }
    }

    let onClickButton = () => {

        if(props.thisPoi.liked){
            saveUnlike();
        }else{
            saveLike();
        }

        setValueBtn(initializeButton);
        props.onChangeLike(true);
    }

    let saveLike = async () => {
        let response = requestPatch(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${props.thisPoi.id}${endpoints.like}`,
            getTokenSilently,
            loginWithRedirect
        ).then(token => (console.log(token)));
    }

    let saveUnlike = async () => {
        let response = requestPatch(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${props.thisPoi.id}${endpoints.unlike}`,
            getTokenSilently,
            loginWithRedirect
        ).then((token) => (console.log(token)));
    }

    return(
        <div>
            { props.thisPoi && initializeButton &&
                <div>
                    <label>Likes : {poi.likes}</label>
                    <button onClick={onClickButton} id={"btnLike"}>{valueBtn}</button>
                </div>
            }

        </div>
    )

}