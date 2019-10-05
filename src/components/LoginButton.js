import React from "react";
import {Auth0Context, Auth0Provider, useAuth0} from "../react-auth0-spa";
import NavLink from "reactstrap/lib/NavLink";
import request from "../utils/request";
import endpoints from "../endpoints";

export default function LoginButton(){


    return <NavLink href="#">Login</NavLink>;
}