import React from "react";
import { Field, reduxForm } from "redux-form";
import { signIn } from "../actions";
import FormField from "./FormField";
import wrapWithForm from "./Form";

const LoginForm = wrapWithForm([
    <Field component={FormField} type={"text"} name={"username"} placeholder={"Username"} key={"username"} />,
    <Field component={FormField} type={"password"} name={"password"} placeholder={"Password"} key={"password"} />
]);

export default reduxForm({form: "login", onSubmit: signIn})(LoginForm);