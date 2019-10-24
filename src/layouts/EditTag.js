import React from 'react';
import './EditPage.css';
import {useAuth0} from "../react-auth0-spa";
import {Formik} from "formik";
import requestPost from "../utils/requestPost";
import endpoints from "../endpoints";

export default function EditTag(props){
    let { loginWithRedirect, getTokenSilently } = useAuth0();

    return(
        <div className='div-edit'>
            <Formik
                initialValues={{ name: '', image: '', color: '',  group: '3'}}
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

                        let response = await requestPost(
                            `${process.env.REACT_APP_SERVER_URL}${endpoints.tags}`,
                            getTokenSilently,
                            loginWithRedirect,
                            values
                        );

                        console.log(response);

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
                        <div>
                            Created at <b>props.poi.createdAt</b> by <b>props.poi.Creator.name</b> (Group props.poi.group)
                        </div>
                        {true && (
                            <div>Updated at <b>props.poi.updatedAt</b></div>
                        )}
                        <button type="submit" disabled={isSubmitting}>
                            Save changes
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}