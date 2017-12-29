import React from "react";
import { Field, reduxForm } from "redux-form";
import { required, confirmation } from 'redux-form-validators'
import { signUp } from "../actions";
import renderField from "./FormField";
import wrapWithForm from "./Form";

const RegistrationForm = wrapWithForm(
    <div className={"form-inputs"}>
        <Field component={renderField} type="text" name="email" placeholder="Email" validate={required()}/>
        <Field component={renderField} type="password" name="password" placeholder="Password" validate={required()}/>
        <Field component={renderField} type="password" name="password_confirmation" placeholder="Confirm Password" validate={[required(), confirmation({ field: "password" })]}/>
    </div>
);

export default reduxForm({form: "register", onSubmit: signUp, submitText: "Sign Up"})(RegistrationForm);