import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { confirmation } from '../actions';
import renderField from './FormField';

const ConfirmationComponent = ({ error, handleSubmit, pristine, reset, submitting }) => {
    return (
        <form onSubmit={handleSubmit(confirmation)}>
            {error && <div><strong>{error}</strong></div>}
            <Field component={renderField} type='text' name='code' placeholder='Confirmation Code'/>
            <button type={'submit'} disabled={pristine || submitting}>Confirm</button>
            <button type={'reset'} disabled={pristine || submitting} onClick={reset}>Cancel</button>
        </form>
    )
};

export default reduxForm({form: 'confirmation'})(ConfirmationComponent);