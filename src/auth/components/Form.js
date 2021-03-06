import React from 'react';

const Form = ({ error, handleSubmit, onSubmit, pristine, reset, submitting, children, submitText = "Save" }) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        {error && <div><strong>{error}</strong></div>}
        {children}
        <button type={"submit"} disabled={pristine || submitting}>{submitText}</button>
        <button type={"reset"} disabled={pristine || submitting} onClick={reset}>Cancel</button>
    </form>
);

export default (children) => (props) => (
    <Form {...props} children={children}/>
);