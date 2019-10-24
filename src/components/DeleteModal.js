/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteModal = (props) => {
    const {
        buttonLabel,
        currentName,
        className,
        deleteClicked
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = (e) => {
        e.preventDefault();
        setModal(!modal);
        console.log(e.target.id === 'delete-button');
        if(e.target.id === 'delete-button'){
            deleteClicked();
        }
    };

    return (
        <div style={{display: "inline-block"}}>
            <Button color="danger" onClick={toggle}>Delete {buttonLabel}</Button>
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