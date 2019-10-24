import React, {useState, useEffect} from 'react';
import './EditPage.css';
import {Formik} from "formik";
import requestPost from "../utils/requestPost";
import {useAuth0} from "../react-auth0-spa";
import endpoints from "../endpoints";
import request from "../utils/request";
import { useHistory } from "react-router-dom";
import requestPatch from "../utils/requestPatch";
import requestDelete from "../utils/requestDelete";
import {Button} from "reactstrap";
import DeleteModal from "../components/DeleteModal";


export default function EditCategory(props) {

    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let url = window.location.href;
    let history = useHistory();
    let[category, setCategory] = useState(null);
    let[newCategory, setNewCategory] = useState(null)
    let currentId = url.substring(url.lastIndexOf("/")+1);

    let [isNew, setIsNew] = useState(true);



    useEffect( () => {
        console.log(currentId);
        if(currentId === "") { //If no ID, then the object is new
            console.log("we got new one");
            setIsNew(true);
            setNewCategory({name: '', image: '', group: '3'});
        }else if(isNaN(currentId)){ //If not a number, ID is invalid, so create new
            console.log("is nan returned true");
            setIsNew(true);
            setNewCategory({name: '', image: '', group: '3'});
        }else{ //If ID exist, time to fetch it on the DB
            console.log("This poi Exists");
            setIsNew(false);
            //here comes the fetch of the category
            let resp = fetchCategory();
        }

    }, [currentId]);

    let fetchCategory = async () => {
        let response = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}${currentId}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (response) {
            console.log(response);
            setCategory(response);
            setNewCategory(response);
        }
    };

    function refreshPage() {
        history.push("/manage/category/" + currentId)
    }
    let deleteCategory = async () => {
        let response = await requestDelete(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}${currentId}`,
            getTokenSilently,
            loginWithRedirect
        );
        console.log(response);
    }
    return(
        <div className='edit-wrapper'>
            <div className='div-edit'>
                {newCategory &&
                <Formik
                    initialValues={{
                        name: newCategory.name,
                        image: newCategory.image,
                        group: newCategory.group}}
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
                                    `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}`,
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
                                    `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}${currentId}`,
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

                            <div>
                                Created at <b>props.poi.createdAt</b> by <b>props.poi.Creator.name</b> (Group props.poi.group)
                            </div>
                            {true && (
                                <div>Updated at <b>props.poi.updatedAt</b></div>
                            )}
                            <Button style={{backgroundColor: 'darkgreen', display: "inline-block"}} type="submit" disabled={isSubmitting}>
                                Save changes
                            </Button><span>  </span>
                            <DeleteModal
                                buttonLabel={"category"}
                                currentName={newCategory.name}
                                className='delete-modal'
                                deleteClicked={deleteCategory}
                            />
                        </form>
                    )}

                </Formik>}

            </div>
            {newCategory &&
            <div className='div-image'>
                <img src={newCategory.image} style={{maxWidth: '100%'}}/>
            </div>
            }

        </div>


    );
}