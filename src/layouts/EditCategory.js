import React, {useState, useEffect} from 'react';
import './EditPage.css';
import {Formik} from "formik";
import requestPost from "../utils/requestPost";
import {useAuth0} from "../react-auth0-spa";
import endpoints from "../endpoints";
import request from "../utils/request";
import {Link, useHistory} from "react-router-dom";
import requestPatch from "../utils/requestPatch";
import requestDelete from "../utils/requestDelete";
import {Button} from "reactstrap";
import DeleteModal from "../components/DeleteModal";


export default function EditCategory(props) {

    let { user, loginWithRedirect, getTokenSilently } = useAuth0();
    let url = window.location.href;
    let history = useHistory();
    let[category, setCategory] = useState(null);
    let[newCategory, setNewCategory] = useState(null);
    let currentId = url.substring(url.lastIndexOf("/")+1);

    let [isNew, setIsNew] = useState(true);
    let defaultCategory = {
        name: '',
        image: '',
        group: 3,
        Creator: null
    }

    //checks if new/editable
    useEffect( () => {
        console.log(currentId);
        if(currentId === "") { //If no ID, then the object is new
            console.log("we got new one");
            setIsNew(true);
            setNewCategory(defaultCategory);
            setCategory(defaultCategory);
        }else if(isNaN(currentId)){ //If not a number, ID is invalid, so create new
            console.log("is nan returned true");
            setIsNew(true);
            setNewCategory(defaultCategory);
            setCategory(defaultCategory);
        }else{ //If ID exist, time to fetch it on the DB
            console.log("This poi Exists");
            setIsNew(false);
            //here comes the fetch of the category
            let resp = fetchAndSetCategory();
        }
    }, [currentId]);

    //get category from the server
    let fetchAndSetCategory = async () => {
        let response = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}${currentId}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (response && !response.error) {
            console.log(response);
            setCategory(response);
            setNewCategory(response);
        }else{
            //if there's an error, we correct it by setting the state to new and default category
            console.log("the missing id has been caught, thus putting isNew to true");
            setIsNew(true);
            setCategory(defaultCategory);
            setNewCategory(defaultCategory);
        }
    };

    function refreshPage() {
        history.push("/manage/category/" + currentId)
    }

    //delete the current category
    let deleteCategory = async () => {
        let response = await requestDelete(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}${currentId}`,
            getTokenSilently,
            loginWithRedirect
        );
        console.log(response);
        currentId = 0;
        history.push("/manage/");
    }
    //returns a form for category edition/creation/visualisation
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
                            {newCategory.Creator &&
                            <div>
                                <div>
                                    Created at <b>{newCategory.createdAt} </b>
                                    by <b>{newCategory.Creator.name}</b> (Group {newCategory.group})
                                </div>
                                <div>Updated at <b>{newCategory.updatedAt}</b></div>
                            </div>
                            }
                            {(isNew || (newCategory.Creator && user && user.sub === newCategory.Creator.id)) &&
                            <Button style={{backgroundColor: 'darkgreen', display: "inline-block", marginTop: '10px'}}
                                    type="submit" disabled={isSubmitting}
                            >
                                Save changes
                            </Button>
                            }<span>  </span>
                            {!isNew && newCategory.Creator &&
                            (user.sub === newCategory.Creator.id) &&
                            <DeleteModal
                                buttonLabel={"category"}
                                currentName={newCategory.name}
                                className='delete-modal'
                                deleteClicked={deleteCategory}
                            />
                            }
                            <span> </span>
                        </form>
                    )}
                </Formik>}
                <br/>
                <Link className='back-button' to='/manage'>Back</Link>
            </div>
            {newCategory &&
            <div className='div-image'>
                <img src={newCategory.image} style={{maxWidth: '100%'}}/>
            </div>
            }
        </div>
    );
}