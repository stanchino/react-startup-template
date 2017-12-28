/* eslint no-ternary: "off" */

import React from "react";
import { connect } from "react-redux";
import ConfirmationForm from "./ConfirmationForm";
import mapStateToProps from "../reducers/stateToProps";

const ConfirmationComponent = ({ isRegistered, isConfirmed, component}) => (
    (isRegistered && !isConfirmed) ? <ConfirmationForm/> : component
);

const ProtectedComponent = ({ isLoggedIn, children, ...props }) => (
    isLoggedIn ? children : <ConfirmationComponent {...props} />
);

export default connect(mapStateToProps)(ProtectedComponent);