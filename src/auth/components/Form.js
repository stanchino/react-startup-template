import React from 'react';

const Form = ({ error, handleSubmit, onSubmit, pristine, reset, submitting, children }) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        {error && <div><strong>{error}</strong></div>}
        {children}
        <button type={"submit"} disabled={pristine || submitting}>Login</button>
        <button type={"reset"} disabled={pristine || submitting} onClick={reset}>Cancel</button>
    </form>
);

export default (children) => (props) => (
    <Form {...props} children={children}/>
);