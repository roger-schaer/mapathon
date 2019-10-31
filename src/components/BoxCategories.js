import React from 'react';
import ModalCategories from "./ModalCategories";
import "./Box.css"
import addLogo from "../assets/add-sign.png"

export default function BoxCategories(props){

    let poiCategories = props.thisPoi.Categories;

    return(
        <div className="categories-box">
            <div><h3 style={{display: "inline-block"}}>Categories</h3>
                <span> </span>{ poiCategories &&
                <button className="button-add-category"><img style={{maxWidth: '15px'}} src={addLogo}/> Add</button>}
            </div>

            {
                poiCategories && poiCategories.map(function(item, i){
                    return <ModalCategories
                        imageCategorie = {item.image}
                        key={i}
                        categoryTitle={item.name}
                    />
                })
            }

        </div>

    );
}
