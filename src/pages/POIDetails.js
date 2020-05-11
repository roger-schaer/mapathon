import React, { useState, useEffect } from "react";
import "./POIDetails.css";
import POI from "../components/POI";
import request from "../utils/request";
import { useAuth0 } from "../react-auth0-spa";
import endpoints from "../endpoints";
import { Link } from "react-router-dom";

export default function POIDetails({ match }) {
  let poiID = +match.params.id;

  let [poi, setPOI] = useState(null);

  let { loading, loginWithRedirect, getTokenSilently } = useAuth0();

  // Get POI details
  useEffect(() => {
    async function getPOI() {
      let poi = await request(
        `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}/${poiID}`,
        getTokenSilently,
        loginWithRedirect
      );

      setPOI(poi);
    }

    getPOI();
  }, [poiID, getTokenSilently, loginWithRedirect]);

  return (
    <div>
      {poi ? <POI {...poi} /> : <p>Loading details...</p>}
      <Link className="App-link" to="/">
        Back
      </Link>
    </div>
  );
}
