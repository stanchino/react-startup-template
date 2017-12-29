import React from "react";
import { Field, reduxForm } from "redux-form";
import { signUp } from "../actions";
import renderField from "./FormField";
import wrapWithForm from "./Form";

const RegistrationForm = wrapWithForm([
    <Field component={renderField} type="text" name="email" placeholder="Email" key={"email"}/>,
    <Field component={renderField} type="text" name="username" placeholder="Username" key={"username"}/>,
    <Field component={renderField} type="password" name="password" placeholder="Password" key={"password"}/>
]);

export default reduxForm({form: "register", onSubmit: signUp, submitText: "Sign Up"})(RegistrationForm);