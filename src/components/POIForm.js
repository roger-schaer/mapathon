import React from 'react';
import { Formik } from 'formik';
import './POIForm.css';



const POIForm = (props) => (
    <div className='detail-div'>
        <div className='img-div'>
            <img style={{maxHeight: "100%", maxWidth: "100%", float: "right"}} src='https://picsum.photos/1200/500' alt="POI image"/><br/>
        </div>
        <div className='detail-content'>

            <h1>props .poi .name big title</h1>
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
                        <span><h4>Description: </h4></span>
                        <textarea
                            //disabled={props.isDisplayOnly}

                            type="text"
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description + "asdfasdfasdfasdfasdfasdfasdfsadfasdfasdfasdfasdfasdfasdfasdfasdf"}
                        />
                        {errors.description && touched.description && errors.description}
                        <span><h4>Website: </h4></span>
                        <input
                            //disabled={props.isDisplayOnly}
                            type="url"
                            name="url"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.url}
                        />
                        {errors.url && touched.url && errors.url}
                        <span><h4>Image: </h4></span>
                        <input
                            //disabled={props.isDisplayOnly}
                            type="url"
                            name="image"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.image || ''}
                        />
                        {errors.image && touched.image && errors.image}
                        <div>
                            Created at <b>props.poi.createdAt</b> by <b>props.poi.Creator.name</b> (Group props.poi.group)
                        </div>
                        {true && (
                            <div>Updated at <b>props.poi.updatedAt</b></div>
                        )}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    </div>

);

export default POIForm;