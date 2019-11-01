/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalCategories  = (props) => {
    const {
        categoryTitle,
        categoryContent,
        className,
        modalTitle,
    } = props;

    const buttonText = "Remove Category";

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    //returns a modal with the name of the category and its image
    return (
        <>
            <Button color="primary" onClick={toggle}>{categoryTitle}</Button>
            <Modal
                isOpen={modal}
                toggle={toggle}
                className={className}
            >
                <ModalHeader toggle={toggle}>{categoryTitle}</ModalHeader>
                <ModalBody>
                    {categoryContent}<br/>
                    <img style={{maxHeight: "30vh", maxWidth: "100%"}} src={props.imageCategorie} alt="POI image"/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>{buttonText}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalCategories;