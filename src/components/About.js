import React from "react";
import "./About.css";

/*
* About Page, used to display informations about us*/
export default class AboutPage extends React.Component{

  render(){
    return(
      <div>
        <div className="about-div">
          <h1>What's mapathon?</h1>
          <p>As part of course 645-1, the Mapathon project was born from the team presented below: </p>
          <ul>
            <li>Audrey Viriot </li>
            <li>Jean-Marie Alder</li>
            <li>Patrick Garbely</li>
            <li>Jonas Pilloud</li>
            <li>Damian Wasmer</li>
            <li>Samuel Pinto Da Silva</li>
          </ul>
          <img className="groupPicture" src="https://www.nicepng.com/png/detail/131-1318482_male-human-group-vector-group-of-people-icon.png"/>

          <p> Everyone joining forces, teamwork was the cornerstone of this project. </p>

          <h4>But what is Mapathon? </h4>

          <p>Mapathon is a project developed in ReactJS that allows the user to save his POIs (points of interest) and display them on a map.
            These can have categories, tags and contain several parameters such as a title, a description, access to their website if they have one, etc.</p>

          <p>Thus, once added, they can of course be edited.</p>

        </div>

      </div>
    );
  }
}