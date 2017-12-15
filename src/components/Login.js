import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { login } from '../auth/actions';


const LoginForm = props => {
    const { error, handleSubmit, pristine, reset, submitting } = props;
    const submit = handleSubmit(login);
    return (
        <form onSubmit={submit}>
            <Field component='input' type='text' name='username' placeholder='Username'/>
            <Field component='input' type='password' name='password' placeholder='Password'/>
            {error && <strong>{error}</strong>}
            <button type={'submit'} disabled={pristine || submitting}>Login</button>
            <button type={'reset'} disabled={pristine || submitting} onClick={reset}>Cancel</button>
        </form>
    );
};

export default reduxForm({form: 'simple'})(LoginForm);