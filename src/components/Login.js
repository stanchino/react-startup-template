import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../auth/actions';
import { Redirect } from 'react-router';


const LoginForm = ({ error, handleSubmit, pristine, reset, submitting, isLoggedIn }) => {
    if (isLoggedIn) return <Redirect to={'/'} />;
    return (
        <form onSubmit={handleSubmit(login)}>
            {error && <div><strong>{error}</strong></div>}
            <Field component='input' type='text' name='username' placeholder='Username'/>
            <Field component='input' type='password' name='password' placeholder='Password'/>
            <button type={'submit'} disabled={pristine || submitting}>Login</button>
            <button type={'reset'} disabled={pristine || submitting} onClick={reset}>Cancel</button>
        </form>
    );
};

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
});


export default reduxForm({form: 'simple'})(connect(mapStateToProps)(LoginForm));