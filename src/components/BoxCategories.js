import React, {useState, useEffect} from 'react';
import ModalCategories from "./ModalCategories";
import "./Box.css"
import addLogo from "../assets/add-sign.png"
import ModalListTagCategorie from "./ModalListTagCategorie";
import requestPatch from "../utils/requestPatch";
import endpoints from "../endpoints";
import {useAuth0} from "../react-auth0-spa";

export default function BoxCategories(props){

    let poiCategories = props.thisPoi.Categories;
    let [arrayCategories, setArrayCategories] = useState([]);
    const [modal, setModal] = useState(false);
    let { loginWithRedirect, getTokenSilently } = useAuth0();

    const toggle = () => setModal(!modal)

    let setArrayC = (value) => setArrayCategories(value);

    let saveChangeCategories = async () => {
        let response = requestPatch(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${props.thisPoi.id}${endpoints.categories}`,
            getTokenSilently,
            loginWithRedirect,
            arrayCategories
        );
        setArrayCategories([]);
    }

    //returns a box With an add button and all categories
    return(
        <div className="categories-box">
            <div><h3 style={{display: "inline-block"}}>Categories</h3>
                <span> </span>{ poiCategories && props.thisPoi && (props.currentUser.sub === props.thisPoi.Creator.id) &&
                <button className="button-add-category" onClick={toggle}><img style={{maxWidth: '15px'}} src={addLogo}/>Manage categories</button>
            }
            </div>

            {
                poiCategories && poiCategories.sort((a, b) => (a.name > b.name) ? 1 : -1).map(function(item, i){
                    return <ModalCategories
                        imageCategorie = {item.image}
                        key={i}
                        categoryTitle={item.name}
                    />
                })
            }

            <ModalListTagCategorie allItem={props.allCategories.sort((a, b) => (a.name > b.name) ? 1 : -1)} setArrayItem={setArrayC} arrayItem={arrayCategories}
                                   thisPoiItem={poiCategories} onChangeTC={props.onChangeC} modal={modal} setModal={setModal}
                                   toggle={toggle} thisPoi={props.thisPoi} saveChange={saveChangeCategories}/>

        </div>

    );
}
