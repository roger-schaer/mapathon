/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//Customizable delete modal
const DeleteModal = (props) => {
    const {
        buttonLabel, //the name of the object you may delete
        currentName, //the exact name of the object you may delete
        className,
        deleteClicked //function to tell if the delete button has been pressed
    } = props;

    const [modal, setModal] = useState(false);

    //Toggles the modal and check if the delete button has been pressed
    const toggle = (e) => {
        e.preventDefault();
        setModal(!modal);
        console.log(e.target.id === 'delete-button');
        if(e.target.id === 'delete-button'){
            //we use callback on delete if the 'delete-button' has been pressed
            deleteClicked();
        }
    };

    //Returns a button with a delete modal.
    //The user can confirm the deletion
    return (
        <div style={{display: "inline-block"}}>
            <Button
                color="danger"
                onClick={toggle}
                style={{marginTop: '10px'}}
            >Delete {buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Delete {buttonLabel}</ModalHeader>
                <ModalBody>
                    Would you like to delete the {buttonLabel} "{currentName}"
                </ModalBody>
                <ModalFooter>
                    <Button id='delete-button' color="danger" onClick={toggle}>Delete {buttonLabel}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteModal;