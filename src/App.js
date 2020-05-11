import React, { useState } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";
import request from "./utils/request";
import endpoints from "./endpoints";
import Loading from "./components/Loading";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import POIDetails from "./pages/POIDetails";

function App() {
  let [pois, setPois] = useState([]);
  let [users, setUsers] = useState([]);
  let { loading, loginWithRedirect, getTokenSilently } = useAuth0();

  let handlePOIsClick = async (e) => {
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

  let handleUsersClick = async (e) => {
    e.preventDefault();
    let users = await request(
      `${process.env.REACT_APP_SERVER_URL}${endpoints.users}`,
      getTokenSilently,
      loginWithRedirect
    );

    if (users && users.length > 0) {
      console.log(users);
      setUsers(users);
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
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <>
                  <a className="App-link" href="#" onClick={handlePOIsClick}>
                    Get POIs
                  </a>
                  <a className="App-link" href="#" onClick={handleUsersClick}>
                    Get Users
                  </a>
                  {pois && pois.length > 0 && (
                    <ul className="POI-List">
                      {pois.map((poi) => (
                        <li key={poi.id}>
                          <Link className="App-link" to={`/poi/${poi.id}`}>
                            {poi.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {users && users.length > 0 && (
                    <ul className="User-List">
                      {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            />
            <Route path="/poi/:id" component={POIDetails} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
