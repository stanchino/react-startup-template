import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions';

const LoginForm = ({ error, handleSubmit, pristine, reset, submitting }) => (
    <form onSubmit={handleSubmit(login)}>
        {error && <div><strong>{error}</strong></div>}
        <Field component='input' type='text' name='username' placeholder='Username'/>
        <Field component='input' type='password' name='password' placeholder='Password'/>
        <button type={'submit'} disabled={pristine || submitting}>Login</button>
        <button type={'reset'} disabled={pristine || submitting} onClick={reset}>Cancel</button>
    </form>
);

export default reduxForm({form: 'simple'})(LoginForm);