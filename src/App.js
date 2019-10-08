import React, { useState } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";
import request from "./utils/request";
import endpoints from "./endpoints";
import Loading from "./components/Loading";
import POI from "./components/POI";
import MyMap from "./components/MyMap";

function App() {
  let [pois, setPois] = useState([]);
  let [markers, setMarkers] = useState([]);
  let { loading, loginWithRedirect, getTokenSilently } = useAuth0();

  let handlePOIsClick = async e => {
    e.preventDefault();
    let pois = await request(
      `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`,
      getTokenSilently,
      loginWithRedirect
    );

    if (pois && pois.length > 0) {
      console.log(pois);
      setPois(pois);
      let markers = [];
      for (let i in pois) {
        let poi = pois[i];
        //initialisation for the pin with the content.
        markers.push({
          key: poi.name,
          position: [poi.lat, poi.lng],
          content: {
            title: poi.name,
            description: poi.description
          }
        });
      }
      // update all the marker in state
      setMarkers(markers);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mapathon</h1>
        <br />
        <a className="App-link" href="#" onClick={handlePOIsClick}>
          Login to see the POI (point of interest)
        </a>
        {pois && pois.length > 0 && (
          <p> click on the map to self-location ;) and unzoom manually </p>
        )}
        <MyMap markers={markers} meText={"coucou"} />
        {pois && pois.length > 0 && (
          <div>
            <p> below we can see all the list of POI from BDD</p>
            <ul className="POI-List">
              {pois.map(poi => (
                <li key={poi.id}>
                  <POI {...poi} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
