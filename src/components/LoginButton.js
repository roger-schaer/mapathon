import React, {useContext} from "react";
import {Auth0Context, Auth0Provider, useAuth0} from "../react-auth0-spa";
import NavLink from "reactstrap/lib/NavLink";
import "./LoginButton.css";
import request from "../utils/request";
import endpoints from "../endpoints";

export default function LoginButton(){

    let usr = useAuth0();
    if(usr.isAuthenticated){
        return (
            <NavLink>Welcome {usr.user.name} <img id="avatar-image" src={usr.user.picture}/></NavLink>
        );
    }
    else{
        return <NavLink onClick={usr.loginWithRedirect} href="#">login</NavLink>;
    }



}