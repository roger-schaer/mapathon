import React from 'react';
import ModalCategories from "./ModalCategories";
import "./Box.css"
import addLogo from "../assets/add-sign.png"

export default function BoxCategories(props){
    return(
        <div className="categories-box">
            <div><h3 style={{display: "inline-block"}}>Categories</h3>
                <span> </span><button className="button-add-category"><img style={{maxWidth: '15px'}} src={addLogo}/> Add</button></div>
            < ModalCategories
                categoryTitle='Category1'
                categoryContent="this is the description of the category blablka blablab lablablablablab lablabla blabla. bhjiasdfjhjfds"
            /><span>  </span>
            <ModalCategories
                categoryTitle='Category2'
                categoryContent='An other Description lol. Dont forget that the cake is a lie.'
            />
        </div>

    );
}
