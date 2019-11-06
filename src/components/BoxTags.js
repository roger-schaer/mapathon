import React, {useState} from 'react';
import addLogo from "../assets/add-sign.png";
import Tag from "./Tag";
import {useAuth0} from "../react-auth0-spa";
import requestPatch from "../utils/requestPatch";
import endpoints from "../endpoints";
import ModalListTagCategorie from "./ModalListTagCategorie";

export default function BoxTags(props) {

    let poiTags = props.thisPoi.Tags;
    const [modal, setModal] = useState(false);
    let [arrayTags, setArrayTags] = useState([]);
    let { loginWithRedirect, getTokenSilently } = useAuth0();

    //function to toggle modals
    const toggle = () => setModal(!modal);

    let setArrayT = (value) => setArrayTags(value);

    let saveChangeTags = async () => {
        let response = requestPatch(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}${props.thisPoi.id}${endpoints.tags}`,
            getTokenSilently,
            loginWithRedirect,
            arrayTags
        );
        setArrayTags([]);
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
                    return <Tag
                        tagToDisplay = {item}
                        key={i}
                    />
                })
            }

            <ModalListTagCategorie allItem={props.allTags} setArrayItem={setArrayT} arrayItem={arrayTags}
                                   thisPoiItem={poiTags} onChangeTC={props.onChangeT} modal={modal} setModal={setModal} toggle={toggle} thisPoi={props.thisPoi}
                                   saveChange={saveChangeTags}/>

        </div>
    );
}