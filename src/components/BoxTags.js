import React, {useState} from 'react';
import addLogo from "../assets/add-sign.png";
import Tag from "./Tag";
import ModalCategories from "./ModalCategories";
import {useAuth0} from "../react-auth0-spa";
import {Link, useHistory} from "react-router-dom";
import {CheckBoxElement} from "./CheckBoxElement";
import requestPatch from "../utils/requestPatch";
import endpoints from "../endpoints";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function BoxTags(props) {

    let poiTags = props.thisPoi.Tags;
    const [modal, setModal] = useState(false);
    let [arrayTags, setArrayTags] = useState([]);
    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let history = useHistory();

    //function to toggle modals
    const toggle = () => setModal(!modal);

    function refreshPage() {
        history.push("/details/" + props.thisPoi.id)
    }

    //Control which checkbox are checked and create an array to send to the server.
    let toggleSubmit = () => {
        props.allTags.map((tag, i) => {
            let cb = document.getElementById(tag.id);
            if (cb != null) {
                if (cb.checked === true) {
                    setArrayTags(arrayTags.push(tag.id))
                }
            }
        })
        saveChangeTags();
        refreshPage();
        toggle();
    }

    let saveChangeTags = async () => {
        let response = requestPatch(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${props.thisPoi.id}${endpoints.tags}`,
            getTokenSilently,
            loginWithRedirect,
            arrayTags
        );
    }

    //returns a box With an add button and all tags
    return(
        <div className="categories-box">
            <div><h3 style={{display: "inline-block"}}>Tags</h3>
                <span> </span>
                { poiTags && props.thisPoi && (props.currentUser.sub === props.thisPoi.Creator.id) &&
                <button className="button-add-category" onClick={toggle}><img style={{maxWidth: '15px'}} src={addLogo}/>Manage tags</button>
                }
            <span> </span>
            </div>

            {
                poiTags && poiTags.map(function(item, i){
                    console.log(item)
                    return <Tag
                        tagToDisplay = {item}
                        key={i}
                    />
                })
            }

            <>
                {props.thisPoi &&
                <Modal
                    isOpen={modal}
                    toggle={toggle}
                >
                    <ModalHeader toggle={toggle}>Add tags to {props.thisPoi.name}</ModalHeader>
                    <ModalBody>
                        {props.allTags && poiTags && props.thisPoi &&
                        props.allTags.map((tag, i) => {
                            for(var j=0; j < poiTags.length; j++){
                                if(poiTags[j].id === tag.id){
                                    return(
                                        <CheckBoxElement id={tag.id} nameElement={tag.name} isChecked={true}/>
                                    )
                                }
                            }
                            return(
                                <CheckBoxElement id={tag.id} nameElement={tag.name} isChecked={false}/>
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