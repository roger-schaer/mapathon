import React from "react";
import {useAuth0} from "../react-auth0-spa";
import NavLink from "reactstrap/lib/NavLink";

export default function LogoutButton(){
    let usr = useAuth0();
    if(usr.isAuthenticated){
        return <NavLink onClick={usr.logout} href="=#">Logout</NavLink>
    }
    return <NavLink></NavLink>
}