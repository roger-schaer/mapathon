import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {CheckBoxElement} from "./CheckBoxElement";
import React, {useState} from "react";
import "./Box.css"

import {useAuth0} from "../react-auth0-spa";

export default function ModalListTagCategorie(props) {

    //Control which checkbox are checked and create an array to send to the server.
    let toggleSubmit = () => {
        { props.allItem &&
        props.allItem.map((item, i) => {
            let cb = document.getElementById(item.id);
            if (cb != null) {
                if (cb.checked === true) {
                    props.setArrayItem(props.arrayItem.push(item.id))
                }
            }
        })
            props.onChangeTC(true);
            props.saveChange();
            props.toggle();
        }
    }


    return(
        <>
            {props.thisPoiItem &&
            <Modal
                isOpen={props.modal}
                toggle={props.toggle}
            >
                <ModalHeader toggle={props.toggle}>Add categories to {props.thisPoi.name}</ModalHeader>
                <ModalBody>
                    {props.allItem && props.thisPoiItem && props.thisPoi &&
                    props.allItem.map((item, i) => {
                        for(var j=0; j < props.thisPoiItem.length; j++){
                            if(props.thisPoiItem[j].id === item.id){
                                return(
                                    <CheckBoxElement id={item.id} nameElement={item.name} isChecked={true}/>
                                )
                            }
                        }
                        return(
                            <CheckBoxElement id={item.id} nameElement={item.name} isChecked={false}/>
                        )
                    })
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            }

        </>
    )


}



