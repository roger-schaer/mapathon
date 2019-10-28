import React, {useState, useEffect} from 'react';
import RequestPost from "../utils/requestPost"
import { Formik } from 'formik';
import './POIForm.css';
import endpoints from "../endpoints";
import {useAuth0} from "../react-auth0-spa";

function POIForm(props){

    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let url = window.location.href;

    let [isClicked, setIsClicked] = useState(false);

    let currentUser = props.currentUser;
    let poiCreator = props.thisPoi.Creator;

    return(
        <div className='detail-div'>
            <div className='img-div'>
                <img style={{maxHeight: "100%", maxWidth: "100%", float: "right"}} src={props.thisPoi.image} alt="POI image"/><br/>
            </div>

            <div className='detail-content'>
                <h1>{props.thisPoi.name}</h1>
                {props.newPoi &&
                <Formik
                        initialValues={{    name: props.newPoi.name,
                                            description: props.newPoi.description,
                                            lat: props.newPoi.lat,
                                            lng: props.newPoi.lng,
                                            image: props.newPoi.image,
                                            url: props.newPoi.url,
                                            group: props.newPoi.group}}
                    validate={values => {
                        let errors = {};
                        {/*Check required name*/}
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(async() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);

                            if(props.isNew){
                                let response = await RequestPost(`${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`,
                                    getTokenSilently,
                                    loginWithRedirect,
                                    values
                                );
                                alert(response);
                                console.log(response);
                                console.log(response.id);
                                props.currentId = response.id ;
                            }else {

                            }

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
                            <span><h4>Latitude : </h4></span>
                            <input
                                disabled={!(props.isEdit)}
                                type="text"
                                name="lat"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lat}
                            />
                            <span><h4>Longitude : </h4></span>
                            <input
                                disabled={!(props.isEdit)}
                                type="text"
                                name="lng"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lng}
                            />
                            <span><h4>Name: </h4></span>
                            <input
                                disabled={!(props.isEdit)} /*ReadOnly mod or not*/
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name && errors.name}
                            <span><h4>Description: </h4></span>
                            <textarea
                                disabled={!(props.isEdit)}
                                type="text"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            {errors.description && touched.description && errors.description}
                            <span><h4>Website: </h4></span>
                            <input
                                disabled={!(props.isEdit)}
                                type="url"
                                name="url"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.url}
                            />
                            {errors.url && touched.url && errors.url}
                            <span><h4>Image: </h4></span>
                            <input
                                disabled={!(props.isEdit)}
                                type="url"
                                name="image"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.image}
                            />
                            {errors.image && touched.image && errors.image}
                            {!props.isNew &&
                            <div>
                                Created at <b>{props.thisPoi.createdAt}</b> by {props.thisPoi.Creator &&
                            <b>{props.thisPoi.Creator.name}</b>} (Group {props.thisPoi.group})
                                <div>Updated at <b>{props.thisPoi.updatedAt}</b></div>
                            </div>
                            }
                            {props.isEdit &&
                                <button type="submit" disabled={isSubmitting}>
                                Submit
                                </button>
                            }

                        </form>
                    )}
                </Formik>}
            </div>
        </div>
    )
}



export default POIForm;