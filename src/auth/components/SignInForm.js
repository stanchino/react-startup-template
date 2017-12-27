import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../actions';
import FormField from './FormField';

const LoginForm = ({ error, handleSubmit, pristine, reset, submitting }) => (
    <form onSubmit={handleSubmit(signIn)}>
        {error && <div><strong>{error}</strong></div>}
        <Field component={FormField} type='text' name='username' placeholder='Username'/>
        <Field component={FormField} type='password' name='password' placeholder='Password'/>
        <button type={'submit'} disabled={pristine || submitting}>Login</button>
        <button type={'reset'} disabled={pristine || submitting} onClick={reset}>Cancel</button>
    </form>
);

export default reduxForm({form: 'login'})(LoginForm);