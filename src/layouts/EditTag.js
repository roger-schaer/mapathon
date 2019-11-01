import React, {useState, useEffect} from 'react';
import './EditPage.css';
import {useAuth0} from "../react-auth0-spa";
import {Formik} from "formik";
import requestPost from "../utils/requestPost";
import endpoints from "../endpoints";
import {Link, useHistory} from "react-router-dom";
import request from "../utils/request";
import requestDelete from "../utils/requestDelete";
import requestPatch from "../utils/requestPatch";
import {Button} from "reactstrap";
import DeleteModal from "../components/DeleteModal";

export default function EditTag(props){
    let { user, loginWithRedirect, getTokenSilently } = useAuth0();
    let url = window.location.href;
    let history = useHistory();
    let[tag, setTag] = useState(null);
    let currentId = url.substring(url.lastIndexOf("/")+1);

    let [isNew, setIsNew] = useState(true);
    let defaultTag = {
        name: '',
        image: '',
        group: 3,
        color: 'white',
        Creator: null
    }

    useEffect( () => {
        console.log(currentId);
        if(currentId === "") { //If no ID, then the object is new
            console.log("we got new one");
            setIsNew(true);
            setTag(defaultTag);
        }else if(isNaN(currentId)){ //If not a number, ID is invalid, so create new
            console.log("is nan returned true");
            setIsNew(true);
            setTag(defaultTag);
        }else{ //If ID exist, time to fetch it on the DB
            console.log("This poi Exists");
            setIsNew(false);
            //here comes the fetch of the Tag
            let resp = fetchAndSetTags();
        }
    }, [currentId]);

    //fetch the tag and assign it to the state of the component
    let fetchAndSetTags = async () => {
        let response = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.tags}${currentId}`,
            getTokenSilently,
            loginWithRedirect
        );
        if (response && !response.error) {
            console.log(response);
            setTag(response);
        }else{
            //if the server returns an error, we set isNew to true and default tag.
            console.log("the missing id has been caught, thus putting isNew to true");
            setIsNew(true);
            setTag(defaultTag);
        }
    };

    function refreshPage() {
        history.push("/manage/tag/" + currentId)
    }

    //delete the current tag
    let deleteTag = async () => {
        let response = await requestDelete(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.tags}${currentId}`,
            getTokenSilently,
            loginWithRedirect
        );
        console.log(response);
        currentId = 0;
        history.push("/manage/");
    }

    //Returns a form to edit/save/display tags
    return(
        <div className='edit-wrapper'>
            <div className='div-edit'>
                {tag &&
                <Formik
                    initialValues={{
                        name: tag.name,
                        image: tag.image,
                        color: tag.color,
                        group: '3'}}
                    validate={values => {
                        let errors = {};
                        {/*Check required name*/}
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(async () => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);

                            if(isNew){
                                let response = await requestPost(
                                    `${process.env.REACT_APP_SERVER_URL}${endpoints.tags}`,
                                    getTokenSilently,
                                    loginWithRedirect,
                                    values
                                );
                                console.log(response);
                                console.log(response.id);
                                currentId = response.id;
                            }
                            else{
                                let response = await requestPatch(
                                    `${process.env.REACT_APP_SERVER_URL}${endpoints.tags}${currentId}`,
                                    getTokenSilently,
                                    loginWithRedirect,
                                    values
                                );
                            }
                            refreshPage();

                        }, 400);

                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <span><h4>Name: </h4></span>
                            <input
                                //disabled={props.isDisplayOnly} /*ReadOnly mod or not*/
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name && errors.name}
                            <span><h4>Image: </h4></span>
                            <input
                                //disabled={props.isDisplayOnly}

                                type="text"
                                name="image"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.image}
                            />
                            {errors.image && touched.image && errors.image}
                            <span><h4>Color: </h4></span>
                            <select
                                name="color"
                                value={values.color}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="white" label="Select a color" />
                                <option value="red" label="Red" style={{backgroundColor: 'red'}}/>
                                <option value="green" label="Green"/>
                                <option value="Gold" label="Gold" style={{backgroundColor: 'Gold'}}/>
                            </select>
                            {tag.Creator &&
                            <div>
                                <div>
                                    Created at <b>props.poi.createdAt</b> by <b>props.poi.Creator.name</b> (Group props.poi.group)
                                </div>
                                <div>Updated at <b>props.poi.updatedAt</b></div>
                            </div>
                            }
                            {(isNew || (tag.Creator && user && user.sub === tag.Creator.id)) &&
                            <Button style={{backgroundColor: 'darkgreen', display: "inline-block", marginTop: '10px'}}
                                    type="submit" disabled={isSubmitting}
                            >
                                Save changes
                            </Button>
                            }<span>  </span>
                            {!isNew && tag.Creator &&
                            (user.sub === tag.Creator.id) &&
                            <DeleteModal
                                buttonLabel={"tag"}
                                currentName={tag.name}
                                className='delete-modal'
                                deleteClicked={deleteTag}
                            />
                            }

                        </form>
                    )}
                </Formik>}
                <br/>
                <Link className='back-button' to='/manage'>Back</Link>
            </div>
            {tag &&
            <div className='div-image'>
                <img src={tag.image} style={{maxWidth: '100%'}}/>
            </div>
            }
        </div>

    );
}