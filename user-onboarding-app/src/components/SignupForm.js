import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field, setNestedObjectValues} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function SignupForm({values, errors, touched, status}) {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        if(status) {
            setUsers([...users, status]) 
        }
    }, [status])

    return (
        <div className='loginForm'>
            {console.log(users)}
            <Form>

                {touched.firstname && errors.firstname && <p>{errors.firstname}</p>}
                <Field type='text' name='firstname' placeholder='First Name' />

                {touched.lastname && errors.lastname && <p>{errors.lastname}</p>}
                <Field type='text' name='lastname' placeholder='Last Name' />

                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type='email' name='email' placeholder='Email' />

                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type='password' name='password' placeholder='Password' />

                <label>
                    <Field type='checkbox' name='tos' checked={values.tos} />
                    Accept Terms of Service
                </label>

                <button type='submit'>Submit!</button>

            </Form>

            {users.map(user => (<p key={user.id}>{user.firstname}</p>))}
        </div>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({firstname, lastname, email, password, tos}) {
        return {
            firstname: firstname || '',
            lastname: lastname || '',
            password: password || '',
            email: email || '',
            tos: tos || false  
        };
    },

    validationSchema: Yup.object().shape({
        firstname: Yup.string()
            .min(3, 'First Name needs to be more than 3') 
            .max(60, 'First Name needs to be less than 60')
            .matches(/[$A-Z]/, 'First letter needs to be uppercase')
            .required(),
        lastname: Yup.string() 
            .min(3, 'Last Name needs to be more than 3')
            .max(60, 'Last Name needs to be less than 60')
            .matches(/[$A-Z]/, 'First letter needs to be uppercase')
            .required(),
        email: Yup.string()
            .email('Invalid email')
            .required(),
        password: Yup.string()
            .min(9, 'Password must be 9 characters or longer') 
            .matches(/[0-9]/, 'Needs at least one number')
            .matches(/[*.,&^%$#@!()><?/]/, 'Needs at least one special character')
            .required(),
        tos: Yup.boolean() 
            .required()
    }),

    handleSubmit(values, {setStatus}) {
        axios
            .post('https://reqres.in/api/users/', values) 
            .then(res => {
                setStatus(res.data)
            })
            .catch(error => console.log('error', error))
    }

})(SignupForm);

export default FormikLoginForm;
