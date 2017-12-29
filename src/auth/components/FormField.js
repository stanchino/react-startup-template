import React from "react";

export default ({ input, label, placeholder, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={placeholder}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);