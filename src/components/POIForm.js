import React, {useState} from 'react';
import { Formik } from 'formik';
import './POIForm.css';

function POIForm(props){

    return(
        <div className='detail-div'>
            <div className='img-div'>
                <img style={{maxHeight: "100%", maxWidth: "100%", float: "right"}} src={props.thisPoi.image} alt="POI image"/><br/>
            </div>
            <div className='detail-content'>
                <h1>{props.thisPoi.name}</h1>
                <Formik
                    initialValues={{ name: 'props.poi.name', description: 'props.poi.description', image: 'props.poi.image', url: 'props.poi.url'}}
                    validate={values => {
                        let errors = {};
                        {/*Check required name*/}
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
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
                            <span><h4>Longitude : </h4></span>
                            <input
                                type="text"
                                name="longitude"
                                value={props.thisPoi.lng}
                            />
                            <span><h4>Latitude : </h4></span>
                            <input
                                type="text"
                                name="latitude"
                                value={props.thisPoi.lat}
                            />
                            <span><h4>Name: </h4></span>
                            <input
                                //disabled={props.isDisplayOnly} /*ReadOnly mod or not*/
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={props.thisPoi.name}
                            />
                            {errors.name && touched.name && errors.name}
                            <span><h4>Description: </h4></span>
                            <textarea
                                //disabled={props.isDisplayOnly}

                                type="text"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={props.thisPoi.description}
                            />
                            {errors.description && touched.description && errors.description}
                            <span><h4>Website: </h4></span>
                            <input
                                //disabled={props.isDisplayOnly}
                                type="url"
                                name="url"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={props.thisPoi.url}
                            />
                            {errors.url && touched.url && errors.url}
                            <span><h4>Image: </h4></span>
                            <input
                                //disabled={props.isDisplayOnly}
                                type="url"
                                name="image"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={props.thisPoi.image}
                            />
                            {errors.image && touched.image && errors.image}
                            <div>
                                Created at <b>{props.thisPoi.createdAt}</b> by <b>PB ICI</b> (Group {props.thisPoi.group})
                            </div>
                            {true && (
                                <div>Updated at <b>{props.thisPoi.updatedAt}</b></div>
                            )}
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}



export default POIForm;