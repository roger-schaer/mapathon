import React, { useState } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";
import request from "./utils/request";
import endpoints from "./endpoints";
import Loading from "./components/Loading";
import POI from "./components/POI";
import CustomNavbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/About";
import HelpPage from "./components/Help";
import Home from "./components/Home";
import FooterSection from "./components/Footer";

//app component main
function App() {

  let { loading } = useAuth0();


  if (loading) {
    return <Loading />;
  }

  // if the user is loged in

  // DON'T ADD PAGE AFTER <Route path="/"> or it will never be accessed
  return (
      <Router>
        <div className="App">
          <CustomNavbar/>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/help">
              <HelpPage />
            </Route>
            <Route path="/starter">
              <TeachersCode/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>



        </div>
        <div>
          <FooterSection/>
        </div>
      </Router>

  );
}

export default App;

function TeachersCode(props){

  let [pois, setPois] = useState([]);
  let { loginWithRedirect, getTokenSilently } = useAuth0();

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
    }
  };

  return(
      <header className="App-header">
        <h1>Mapathon</h1>
        <br />
        <a className="App-link" href="#" onClick={handlePOIsClick}>
          Get POIs
        </a>
        {pois && pois.length > 0 && (
            <ul className="POI-List">
              {pois.map(poi => (
                  <li key={poi.id}>
                    <POI {...poi} />
                  </li>
              ))}
            </ul>
        )}
        <p></p>
      </header>
  );
}
