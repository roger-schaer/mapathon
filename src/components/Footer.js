import React from "react";
import "./Footer.css";
export default class FooterSection extends React.Component{

    //Returns the footer of the application
    render(){
        return(
            <div className="footer-div">
                &copy; Made in Valais, Switzerland. 2019
            </div>
        );
    }
}