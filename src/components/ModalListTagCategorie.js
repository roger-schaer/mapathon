import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {CheckBoxElement} from "./CheckBoxElement";
import React, {useState, useEffect} from "react";

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
                style={{width:"400px"}}
            >
                <ModalHeader toggle={props.toggle}>Add categories to {props.thisPoi.name}</ModalHeader>
                <ModalBody>
                    <input id="searchLabel" type="text" name="search" placeholder="Search..." onChange={() => {
                        let inputText = document.getElementById("searchLabel").value;
                        inputText = inputText.toUpperCase();
                        props.allItem.map((item, i) => {
                            let cb = document.getElementById(item.id+"div")
                            if(cb != undefined || cb != null){
                                let value = item.name.toUpperCase();
                                if(value.indexOf(inputText) > -1){
                                    cb.style.display = '';
                                }else{
                                    cb.style.display = 'none';
                                }
                            }
                        })
                    }}/>
                    <table style={{marginLeft : "auto", marginRight : "auto"}}>
                    {props.allItem && props.thisPoiItem && props.thisPoi &&
                    props.allItem.map((item, i) => {
                        for(var j=0; j < props.thisPoiItem.length; j++){
                            if(props.thisPoiItem[j].id === item.id){
                                return(
                                    <CheckBoxElement id={item.id} nameElement={item.name} isChecked={true} picture={item.image}/>
                                )
                            }
                        }
                        return(
                            <CheckBoxElement id={item.id} nameElement={item.name} isChecked={false} picture={item.image}/>
                        )
                    })
                    }
                    </table>
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



