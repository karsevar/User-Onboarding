import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function SignupForm({values}) {
    return (
        <div className='loginForm'>
            <Form>
                <Field type='text' name='username' placeholder='Name' />
                <Field type='email' name='email' placeholder='Email' />
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

    handleSubmit(values) {
        console.log(values);
    }
})(SignupForm);

export default FormikLoginForm;
