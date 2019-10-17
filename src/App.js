import React, { useState } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";
import request from "./utils/request";
import requestPOI from "./utils/requestPOI";
import endpoints from "./endpoints";
import Loading from "./components/Loading";
import POI from "./components/POI";
import MyMap from "./components/MyMap";
import NavigationBar from "./components/NavigationBar";

function App() {
  let [pois, setPois] = useState([]);
  let [markers, setMarkers] = useState([]);
  let {
    loading,
    loginWithPopup,
    getTokenSilently,
    logout,
    isAuthenticated
  } = useAuth0();

  let [menuState, setMenuState] = useState(false);
  let handlePOIsClick = async e => {
    e.preventDefault();
    try {
      let token = await getTokenSilently();
    } catch (e) {
      console.error(e);
      await loginWithPopup();
    }
  };
  let handleLogout = () => {
    logout();
    setPois([]);
  };
  let handleMenu = () => {
    setMenuState(!menuState);
  };
  let handleMenuChange = isOpen => {
    setMenuState(isOpen);
  };
  let handleGetPOI = async () => {
    // e.preventDefault();
    let pois = await request(
      `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`,
      getTokenSilently,
      loginWithPopup
    );
    setPois(pois);
    console.log(pois);
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
  };
  let handleForm = async newPOI => {
    let tokenForm = await getTokenSilently();
    try {
      let response = await fetch(
        "https://backend.mapathon.ehealth.hevs.ch/poi",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenForm}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: newPOI.name,
            description: newPOI.description,
            lat: newPOI.lat,
            lng: newPOI.lng,
            group: newPOI.group,
            image: newPOI.image
          })
        }
      );
      let data = await response.json();
      console.log(data);
    } catch (error) {}
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <NavigationBar
        handleLogin={handlePOIsClick}
        handleLogout={handleLogout}
        handleMenu={handleMenu}
        handleGetPOI={handleGetPOI}
        isAuthenticated={isAuthenticated}
      />

      <header className="App-header">
        <MyMap
          markers={markers}
          meText={"coucou"}
          menuState={menuState}
          isAuthenticated={isAuthenticated}
          handleMenu={handleMenu}
          handleMenuChange={handleMenuChange}
          handleForm={handleForm}
        />

        {/* {pois && pois.length > 0 && (
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
        )} */}
      </header>
    </div>
  );
}

export default App;
