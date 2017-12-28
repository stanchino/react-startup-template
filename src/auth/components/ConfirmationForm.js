import React from "react";
import { Field, reduxForm } from "redux-form";
import { confirmation } from "../actions";
import renderField from "./FormField";
import wrappedWithForm from "./Form";

const ConfirmationComponent = wrappedWithForm(
    <Field component={renderField} type="text" name="code" placeholder="Confirmation Code"/>
);

export default reduxForm({form: "confirmation", onSubmit: confirmation})(ConfirmationComponent);