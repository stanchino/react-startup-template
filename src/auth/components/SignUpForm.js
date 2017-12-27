import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { signUp } from '../actions';
import renderField from './FormField';

const RegistrationForm = ({ error, handleSubmit, pristine, reset, submitting }) => (
    <form onSubmit={handleSubmit(signUp)}>
        {error && <div><strong>{error}</strong></div>}
        <Field component={renderField} type='text' name='email' placeholder='Email'/>
        <Field component={renderField} type='text' name='username' placeholder='Username'/>
        <Field component={renderField} type='password' name='password' placeholder='Password'/>
        <button type={'submit'} disabled={pristine || submitting}>Sign Up</button>
        <button type={'reset'} disabled={pristine || submitting} onClick={reset}>Cancel</button>
    </form>
);

export default reduxForm({form: 'register'})(RegistrationForm);