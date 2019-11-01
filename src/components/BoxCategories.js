import React, {useState} from 'react';
import ModalCategories from "./ModalCategories";
import "./Box.css"
import addLogo from "../assets/add-sign.png"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function BoxCategories(props){

    let poiCategories = props.thisPoi.Categories;
    const [modal, setModal] = useState(false);

    //function to toggle modals
    const toggle = () => setModal(!modal);

    //returns a box With an add button and all categories
    return(
        <div className="categories-box">
            <div><h3 style={{display: "inline-block"}}>Categories</h3>
                <span> </span>{ poiCategories &&
                <button className="button-add-category" onClick={toggle}><img style={{maxWidth: '15px'}} src={addLogo}/> Add</button>}
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
                <Modal
                    isOpen={modal}
                    toggle={toggle}
                >
                    <ModalHeader toggle={toggle}>Audrey 1</ModalHeader>
                    <ModalBody>
                        Audrey 2<br/>
                        <img style={{maxHeight: "30vh", maxWidth: "100%"}} src={props.imageCategorie} alt="POI image"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Audrey 3</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>

        </div>

    );
}
