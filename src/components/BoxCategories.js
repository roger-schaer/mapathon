import React, {useState, useEffect} from 'react';
import ModalCategories from "./ModalCategories";
import "./Box.css"
import addLogo from "../assets/add-sign.png"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {CheckBoxElement} from "./CheckBoxElement";
import requestPatch from "../utils/requestPatch";
import endpoints from "../endpoints";
import {useAuth0} from "../react-auth0-spa";
import {useHistory} from "react-router-dom";

export default function BoxCategories(props){

    let poiCategories = props.thisPoi.Categories;
    const [modal, setModal] = useState(false);
    let [arrayCategories, setArrayCategories] = useState([]);
    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let history = useHistory();

    //function to toggle modals
    const toggle = () => setModal(!modal);

    function refreshPage() {
        history.push("/details/" + props.thisPoi.id)
    }

    //Control which checkbox are checked and create an array to send to the server.
    let toggleSubmit = () => {
        props.allCategories.map((categorie, i) => {
            let cb = document.getElementById(i);
            if (cb != null) {
                if (cb.checked === true) {
                    setArrayCategories(arrayCategories.push(categorie.id))
                }
            }
        })
        saveChangeCategories();
        refreshPage();
        toggle();
    }

    let saveChangeCategories = async () => {
        let response = requestPatch(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${props.thisPoi.id}${endpoints.categories}`,
            getTokenSilently,
            loginWithRedirect,
            arrayCategories
        );
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
                poiCategories && poiCategories.map(function(item, i){
                    return <ModalCategories
                        imageCategorie = {item.image}
                        key={i}
                        categoryTitle={item.name}
                    />
                })
            }

            <>
                {props.thisPoi &&
                <Modal
                    isOpen={modal}
                    toggle={toggle}
                >
                    <ModalHeader toggle={toggle}>Add categories to {props.thisPoi.name}</ModalHeader>
                    <ModalBody>
                        {props.allCategories && poiCategories && props.thisPoi &&
                            props.allCategories.map((categorie, i) => {
                                for(var j=0; j < poiCategories.length; j++){
                                    if(poiCategories[j].id === categorie.id){
                                        return(
                                            <CheckBoxElement id={categorie.id} nameElement={categorie.name} isChecked={true}/>
                                        )
                                    }
                                }
                                return(
                                    <CheckBoxElement id={i} nameElement={categorie.name} isChecked={false}/>
                                )
                            })
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggleSubmit}>Submit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                }

            </>

        </div>

    );
}
