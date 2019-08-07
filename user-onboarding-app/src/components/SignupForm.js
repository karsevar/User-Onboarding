import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function SignupForm({values, errors, touched}) {
    return (
        <div className='loginForm'>
            <Form>
                {touched.username && errors.username && <p>{errors.username}</p>}
                <Field type='text' name='username' placeholder='Name' />
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type='email' name='email' placeholder='Email' />
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type='password' name='password' placeholder='Password' />
                <label>
                    <Field type='checkbox' name='tos' checked={values.tos} />
                    Accept Terms of Service
                </label>
                <button>Submit!</button>
            </Form>
        </div>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({username, email, password, tos}) {
        return {
            username: username || '',
            email: email || '',
            password: password || '',
            tos: tos || false  
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .min(14,'Too Short')
            .max(30, 'Too Long')
            .required('Name is Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is Required'),
        password: Yup.string()
            .min(9, 'Password must be 9 characters or longer') 
            .required('Password is required') 
    }),

    handleSubmit(values) {
        console.log(values);
    }
})(SignupForm);

export default FormikLoginForm;
