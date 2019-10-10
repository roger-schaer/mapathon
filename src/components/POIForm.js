import React from 'react';
import { Formik } from 'formik';



const POIForm = (props) => (
    <div>
        <h1>{props.poi.name}</h1>
        <Formik
            initialValues={{ name: props.poi.name, description: props.poi.description, image: props.poi.image, url: props.poi.url}}
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
                    <span><b>Name: </b></span>
                    <input
                        disabled={props.isDisplayOnly} /*ReadOnly mod or not*/
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {errors.name && touched.name && errors.name}<br/>
                    <span><b>Description: </b></span>
                    <input
                        disabled={props.isDisplayOnly}
                        type="text"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                    />
                    {errors.description && touched.description && errors.description}<br/>
                    <span><b>Image: </b></span>
                    <input
                        disabled={props.isDisplayOnly}
                        type="url"
                        name="image"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.image}
                    />
                    {errors.image && touched.image && errors.image}<br/>
                    <img style={{maxwidth: '50%'}} src={props.poi.image} alt="POI image"/><br/>
                    <span><b>Website: </b></span>
                    <input
                        disabled={props.isDisplayOnly}
                        type="url"
                        name="url"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.url}
                    />
                    {errors.url && touched.url && errors.url}<br/>
                    <div>
                        Created by <b>{props.poi.Creator.name}</b>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
);

export default POIForm;